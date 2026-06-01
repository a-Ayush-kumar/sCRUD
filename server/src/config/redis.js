const redis = require("redis");

let redisClient = null;

const connectRedis = async () => {
  try {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL,
    });

    redisClient.on("error", (err) => {
      console.log("Redis Error:", err.message);
    });

    await redisClient.connect();

    console.log("Redis Connected");
  } catch (err) {
    console.log(
      "Redis unavailable, running without cache"
    );

    redisClient = null;
  }
};

module.exports = {
  connectRedis,
  getRedisClient: () => redisClient,
};