import mongoose from "mongoose";
import Mockgoose from "mockgoose";

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@expensetracker.lfmha.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

export const connectDB = async () => {
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("DB connection successful!");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export function close() {
  return mongoose.disconnect();
}

export function connectTestDB() {
  return new Promise((resolve, reject) => {
    const _mockgoose = Mockgoose.Mockgoose;
    const db = new _mockgoose(mongoose);

    db.prepareStorage().then(() => {
      mongoose
        .connect(uri, {
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
          useCreateIndex: true,
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    });
  });
}
