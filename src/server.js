import app from "./app.js";
import { logger } from "./helpers/logger.js";
import { connectDB } from "./config/database.js";

const port = process.env.PORT || 3400;

let server;

connectDB()
  .then(() => {
    server = app.listen(port, () => {
      // eslint-disable-next-line no-console
      logger.info(`################################################
      🛡️  Server listening on port: ${port} 🛡️
      ################################################`);
    });
  })
  .catch(() => {
    console.log("Database connection failed");
  });

process.on("unhandledRejection", (err) => {
  // eslint-disable-next-line no-console
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  // eslint-disable-next-line no-console
  console.log(err);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
