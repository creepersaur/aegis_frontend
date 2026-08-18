const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const { predictProba } = require("./utils/logisticRegression");
const { processBatch } = require("./utils/batchProcessor");

const socketAuth = (socket, next) => {
    try {
        const cookies = cookie.parse(socket.handshake.headers.cookie || "");
        const token = cookies.token;

        if (!token) {
            return next(new Error("Authentication error: Token missing"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        socket.user = decoded;
        next();
    } catch (err) {
        console.error("Socket Auth Error:", err.message);
        next(new Error("Authentication error: Invalid token"));
    }
};

const handleSensorDataStream = (socket) => {
    socket.on("sensor_data_stream", async (data) => {
        try {
            if (!data || typeof data !== 'object') {
                return socket.emit("error", { message: "Invalid payload format" });
            }

            const {
                Acc_X, Acc_Y, Acc_Z,
                Gyro_X, Gyro_Y, Gyro_Z,
                Speed, Speed_kmh,
                Acceleration, Motion_Intensity
            } = data;
            const speed_ms = Speed !== undefined ? Speed : (Speed_kmh ? Speed_kmh / 3.6 : 0);
            const accel = Acceleration !== undefined ? Acceleration : (Motion_Intensity || 0);
            const angularSpeed = Math.sqrt(
                Math.pow(Gyro_X || 0, 2) +
                Math.pow(Gyro_Y || 0, 2) +
                Math.pow(Gyro_Z || 0, 2)
            );
            const features = [
                Acc_X || 0,
                Acc_Y || 0,
                Acc_Z || 0,
                Gyro_X || 0,
                Gyro_Y || 0,
                Gyro_Z || 0,
                speed_ms,
                accel,
                angularSpeed
            ];

            setImmediate(() => {
                try {
                    const proba = predictProba(features);
                    const isAnomaly = proba > 0.5;

                    if (isAnomaly) {
                        const alertPayload = {
                            timestamp: new Date().toISOString(),
                            severity: proba > 0.8 ? 'CRITICAL' : 'HIGH',
                            probability: proba,
                            triggered_values: data
                        };
                        
                        console.log(`[ALERT] Anomaly detected for user ${socket.user?.id || 'unknown'}. Prob: ${proba.toFixed(2)}`);
                        socket.emit("anomaly_alert", alertPayload);
                    }
                } catch (predErr) {
                    console.error("Prediction error:", predErr);
                }
            });

        } catch (err) {
            console.error("Sensor data stream error:", err);
            socket.emit("error", { message: "Internal server error processing sensor data" });
        }
    });
};

const handleSensorBatchStream = (socket) => {
    socket.on("sensor_batch_stream", (payload) => {
        try {
            if (!payload || typeof payload !== 'object' || !Array.isArray(payload.samples)) {
                console.warn(`[WARN] Invalid batch payload from user ${socket.user?.id || 'unknown'}`);
                return socket.emit("batch_error", { message: "Invalid payload format. Expected { samples: [...] }" });
            }

            const { samples, timestamp_start, timestamp_end } = payload;

            setImmediate(() => {
                try {
                    const result = processBatch(samples);

                    if (result.isAnomaly) {
                        const alertPayload = {
                            anomaly_score: result.maxProba,
                            timestamp: new Date().toISOString(),
                            trigger_features: result.triggerFeatures,
                            suggested_action: result.maxProba > 0.8 ? "ESCALATE_CRITICAL" : "NOTIFY_CONTACTS",
                            batch_window: { timestamp_start, timestamp_end }
                        };
                        
                        console.log(`[ALERT] Anomaly detected in batch for user ${socket.user?.id || 'unknown'}. Max Prob: ${result.maxProba.toFixed(2)}`);
                        socket.emit("anomaly_detected", alertPayload);
                    } else {
                        socket.emit("window_acknowledged", { 
                            status: "normal", 
                            processed_samples: result.totalSamples,
                            timestamp_end
                        });
                    }
                } catch (batchErr) {
                    console.error("Batch processing error:", batchErr);
                    socket.emit("batch_error", { message: "Error processing sensor batch window." });
                }
            });

        } catch (err) {
            console.error("Sensor batch stream error:", err);
            socket.emit("batch_error", { message: "Internal server error parsing batch data." });
        }
    });
};

module.exports = (io) => {
    io.use(socketAuth);

    io.on("connection", (socket) => {
        console.log(`[INFO] Socket connected: ${socket.id} (User: ${socket.user?.id || 'unknown'})`);

        handleSensorDataStream(socket);
        handleSensorBatchStream(socket);

        socket.on("disconnect", (reason) => {
            console.log(`[INFO] Socket disconnected: ${socket.id} | Reason: ${reason}`);
        });
    });
};
