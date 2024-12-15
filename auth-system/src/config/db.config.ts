import mongoose from "mongoose";
const DB_NAME = "authnext";
async function connectDB() {
  try {
    mongoose.connect(`${process.env.MONGODB_URI!}/${DB_NAME}`);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connection successfull!!");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error, Please make sure you are connected to the internet and the service is running correctly!" +
          err
      );
      process.exit(1);
    });
  } catch (error) {
    console.log("Error connecting to the MONGODB database");
    console.log("Error :: connectDB :: ", error);
  }
}

export default connectDB;
