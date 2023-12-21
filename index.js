import express from "express";
import multer from "multer";

const app = express();

app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/img", upload.array("image", 12), (req, res) => {
  console.log(req.files);
  res.send({
    message: `Photo uploaded successfully at ${new Date().toLocaleString()}`,
  });
});

app.listen(5000, () =>
  console.log(`Port started on port 5000 at ${new Date().toLocaleString()}`)
);
