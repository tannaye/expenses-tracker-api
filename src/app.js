import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import { createWriteStream } from "fs";
import { join, resolve } from "path";
import compression from "compression";
import morgan from "morgan";
import myServer from "./api/routes/server.js";

config({ path: "config.env" });
const app = express();
const __dirname = resolve();

//admin imports
import adminAuth from "./api/routes/admin/auth.js";
import admin from "./api/routes/admin/adminCrud.js";

//user routes imports
import userCrud from "./api/routes/user/userCrud.js";
import userAuth from "./api/routes/user/auth.js";

import expense from "./api/routes/user/expense.js";

// parse application/json
app.use(json());
// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

process.on("uncaughtException", (err) => {
  // eslint-disable-next-line no-console
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  // eslint-disable-next-line no-console
  console.log(err);
  console.log(err.name, err.message);
  process.exit(1);
});

//Allow all requests from all domains & localhost
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
  next();
});

// Routes
app.use("", myServer);

// Admin routes
app.use("/api/v1/admin", admin);
app.use("/api/v1/admin/auth", adminAuth);

// User routes
app.use("/api/v1/user", userCrud);
app.use("/api/v1/user", userAuth);
app.use("/api/v1/expense", expense);

// create a write stream (in append mode)
const accessLogStream = createWriteStream(join(__dirname, "access.log"), {
  flags: "a",
});

app.use(helmet());
app.use(compression());
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

export default app;
