import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/workout.routes.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

const whitelist = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the request origin is in the whitelist or if there is no origin (e.g., same-origin requests)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
};
// Enable CORS middleware with the configured options
app.use(cors(corsOptions));

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//

// route handler
app.use("/api/v1/", router);

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(port, () => {
      console.log(`listening on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error !!!", error);
  });
