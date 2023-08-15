import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // so that we can properly send our request
app.use(cors());

app.use("/posts", postRoutes); // localhost:5000/posts --> means every inside postRoutes is going to start with '/post'
app.use("/user", userRoutes);
// we can host our database one mongoDB atlas

// mongoose use to connect with database
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running  on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
// sever connected to database-> then will run otherwise->catch will run
mongoose.set("useFindAndModify", false);
