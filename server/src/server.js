require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect MongoDB
    await connectDB();
    await connectRedis();
    // Test Redis Connection
    // await redisClient.set(
    //   "test",
    //   "hello",
    //   "EX",
    //   60
    // );

    // const value = await redisClient.get("test");

    // console.log("Redis Test:", value);

    // Start Server
    app.listen(PORT, () => {
      console.log(
        `Server Running on ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Server Startup Error:",
      error
    );
    process.exit(1);
  }
};

startServer();