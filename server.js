import express from "express";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const app = express();

dotenv.config();
const { PORT = 5000 } = process.env;

app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/media", upload.array("image", 12), (req, res) => {
  console.log(req.files);
  res.send({ message: `Picture uploaded successfully` });
});

app.listen(PORT, () =>
  console.log(`App started on port ${PORT} at ${new Date().toLocaleString()}`)
);
