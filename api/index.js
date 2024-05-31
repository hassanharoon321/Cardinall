const express = require("express");
const app = express();
const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const router = express.Router();
const path = require("path");
const cors = require("cors");
dotenv.config();

//b7gkD9wNI1j4BYpn
//middleware

const uri =
  "mongodb+srv://CardinalAdmin:b7gkD9wNI1j4BYpn@cardinaldatabase.pav6uxd.mongodb.net/CardinalDataBase?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Adjust as needed
    socketTimeoutMS: 45000, // Adjust as needed
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.use(cors());
// app.use("/users", userRoute);
app.use(express.json());
app.use(cors({ origin: true }));
app.use(helmet());
app.use(morgan("common"));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  // Get or create user on Chat Engine!
  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": "e9176648-b57b-4f21-83bc-ceb3f11e3835" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
