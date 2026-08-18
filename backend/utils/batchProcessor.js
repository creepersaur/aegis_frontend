const { predictProba } = require("./logisticRegression");

/**
 * Validates and processes a time-windowed batch of sensor data (e.g., 10 seconds).
 * Ensures mathematical processing is robust against jitter, missing readings, or empty arrays.
 * 
 * @param {Array} samples - Array of continuous sensor readings.
 * @returns {Object} - Result containing max probability, trigger features, and anomaly status.
 */
const processBatch = (samples) => {
    if (!Array.isArray(samples) || samples.length === 0) {
        throw new Error("Invalid batch: samples must be a non-empty array.");
    }

    let maxProba = 0;
    let triggerFeatures = null;
    let anomalyCount = 0;

    for (let i = 0; i < samples.length; i++) {
        const data = samples[i];
        
        if (!data || typeof data !== 'object') continue;

        const {
            Acc_X = 0, Acc_Y = 0, Acc_Z = 0,
            Gyro_X = 0, Gyro_Y = 0, Gyro_Z = 0,
            Speed, Speed_kmh,
            Acceleration, Motion_Intensity
        } = data;

        const speed_ms = Speed !== undefined ? Number(Speed) : (Speed_kmh !== undefined ? Number(Speed_kmh) / 3.6 : 0);
        const accel = Acceleration !== undefined ? Number(Acceleration) : (Motion_Intensity !== undefined ? Number(Motion_Intensity) : 0);
        const angularSpeed = Math.sqrt(
            Math.pow(Number(Gyro_X), 2) +
            Math.pow(Number(Gyro_Y), 2) +
            Math.pow(Number(Gyro_Z), 2)
        );
        const features = [
            Number(Acc_X), Number(Acc_Y), Number(Acc_Z),
            Number(Gyro_X), Number(Gyro_Y), Number(Gyro_Z),
            speed_ms, accel, angularSpeed
        ];

        const proba = predictProba(features);
        
        if (proba > 0.5) {
            anomalyCount++;
        }

        if (proba > maxProba) {
            maxProba = proba;
            triggerFeatures = data;
        }
    }

    return {
        isAnomaly: maxProba > 0.5,
        maxProba,
        triggerFeatures,
        anomalyCount,
        totalSamples: samples.length
    };
};

module.exports = { processBatch };
