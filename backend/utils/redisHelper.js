const { createClient } = require("redis");
const client = createClient();

client.on("error", err => console.error("Redis Error:", err));

client.connect()
    .then(() => { console.log("Successfully connected to Redis.") })
    .catch((err) => { console.error("Error in connecting to Redis:", err) });

const setAnomaly = async (userId, alertPayload) => {
    await client.set(`anomalies:${userId}`, JSON.stringify(alertPayload));
};

const getAnomaly = async (userId) => {
    const data = await client.get(`anomalies:${userId}`);
    return data ? JSON.parse(data) : null;
};

module.exports = { setAnomaly, getAnomaly };