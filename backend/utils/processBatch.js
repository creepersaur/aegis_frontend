const { predict } = require("./logisticRegression");

module.exports = (motionData, latitude, longitude) => {
    if (!Array.isArray(motionData) || motionData.length === 0) {
        throw new Error("Motion sensor data must be a valid non-empty array.");
    }

    let anomalyCount = 0;

    for (let i = 0; i < motionData.length; i++) {
        let sample = motionData[i];

        if (!Array.isArray(sample) || sample.length !== 9) {
            throw new Error("Motion sensor data must contain 9 features.");
        }

        for (let j = 0; j < 9; j++) {
            if (typeof(sample[j]) !== "number" || !Number.isFinite(sample[j])) {
                throw new Error("Motion sensor data must contain valid numbers.");
            }
        }

        if (predict(sample)) {
            anomalyCount++;
        }
    }

    const lastSpeed = motionData[motionData.length - 1][6];

    if (typeof latitude !== "number" || !Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
        throw new Error("Latitude must be a valid number between -90 and 90.");
    }

    if (typeof longitude !== "number" || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
        throw new Error("Longitude must be a valid number between -180 and 180.");
    }


    return {
        anomalyCount,
        totalSamples: motionData.length,
        latitude,
        longitude,
        lastSpeed,
        timestamp: new Date().toISOString()
    }
};
