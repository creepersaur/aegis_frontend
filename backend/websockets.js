const { parseCookie } = require("cookie");
const jwt = require("jsonwebtoken");
const processBatch = require("./utils/processBatch");
const { setAnomaly, getAnomaly } = require("./utils/redisHelper");
const calculateDistance = require("./utils/calculateDistance");

const SPEED_DROP_THRESHOLD = 0.7;
const MIN_DISTANCE_THRESHOLD = 10; // in meters

const socketAuth = (socket, next) => {
    try {   
        const cookies = parseCookie(socket.handshake.headers.cookie || "");
        const token = cookies.token;

        if (!token) {
            return next(new Error("Authentication error: Token missing"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        next();
    } catch (err) {
        console.error("Socket Auth Error:", err.message);
        next(new Error("Authentication error: Invalid token"));
    }
};

const handleSensorBatchStream = (socket) => {
    socket.on("sensor_batch_stream", async (payload) => {
        try {
            if (!payload || typeof payload !== "object") {
                return socket.emit("payload_error", { message: "Payload must be an object." });
            }

            const { motionData, latitude, longitude } = payload;
            const result = processBatch(motionData, latitude, longitude);

            const prevAnomaly = await getAnomaly(socket.user.id);
            if (prevAnomaly) {
                const currentSpeed = result.lastSpeed;
                const currentLatitude = result.latitude;
                const currentLongitude = result.longitude;

                const prevSpeed = prevAnomaly.lastSpeed;
                const prevLatitude = prevAnomaly.latitude;
                const prevLongitude = prevAnomaly.longitude;

                const speedDip = ((prevSpeed - currentSpeed) / prevSpeed);
                const distance = calculateDistance(currentLatitude, currentLongitude, prevLatitude, prevLongitude);

                if (speedDip >= SPEED_DROP_THRESHOLD && distance <= MIN_DISTANCE_THRESHOLD) {
                    return socket.emit("crash_alert", {
                        message: "A potential vehicle crash has been detected."
                    });
                }
            }

            if (result.anomalyCount > 0) {
                await setAnomaly(socket.user.id, result);
                return socket.emit("sensor_alert", {
                    message: "Anomalies have been detected in motion sensor readings."
                });
            } else {
                return socket.emit("sensor_normal", {
                    message: "No anomalies have been detected in motion sensor readings."
                });
            }
        } catch (err) {
            console.error("Batch processing error:", err);
            return socket.emit("error", {
                message: "An unexpected error occurred."
            });
        }
    });
};

module.exports = (io) => {
    io.use(socketAuth);

    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id} (User: ${socket.user?.id || 'unknown'})`);

        handleSensorBatchStream(socket);

        socket.on("disconnect", (reason) => {
            console.log(`Socket disconnected: ${socket.id} | Reason: ${reason}`);
        });
    });
};
