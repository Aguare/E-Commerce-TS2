import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import router from './routes/routes';
import connection from './dbConnect';

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationDir = req.body.isProfileImg
      ? 'public/img/profiles'
      : 'public/img/products';
    cb(null, path.join(__dirname, destinationDir));
  },
  filename: (req, file, cb) => {
    const newNameFile = uuid() + path.extname(file.originalname).toLowerCase();
    const { userId } = req.body;
    const isProfileImg = req.body.isProfileImg || false;
    if (isProfileImg) {
      const query = `UPDATE user SET profile = ? WHERE id = ?`;
      connection.query(
        query,
        [newNameFile, userId],
        (error, results, fields) => {
          if (error) {
            return cb(error, null);
          }
        }
      );
    } else {
      const query = `INSERT INTO image (path, FK_User) VALUES (?, ?)`;
      connection.query(
        query,
        [newNameFile, userId],
        (error, results, fields) => {
          if (error) {
            return cb(error, null);
          }
        }
      );
    }
    cb(null, newNameFile);
  }
});

const upload = multer({
  storage: storage,
  dest: path.join(__dirname, 'public/img/products'),
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: El archivo debe ser una imagen valida');
  }
}).array('images', 10);

app.use(upload);
app.use(
  cors({
    origin: 'http://localhost:4200'
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(router);

export default app;
