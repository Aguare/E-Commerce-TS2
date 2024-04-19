import express from 'express';
import { Router } from 'express';
const generalRoutes = require('./general.routes');
const publicationRoutes = require('./publication.routes');
const chatRoutes = require('./chat.routes');

const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/upload', (req, res) => {
  try {
    if (req.files.length <= 0) {
      return res
        .status(400)
        .send({ error: true, message: 'Debe subir al menos una imagen' });
    }
    let paths = [];
    req.files.forEach((file) => {
      const path = 'http://localhost:3000/img/products/' + file.filename;
      console.log(path);
      paths.push(path);
    });
    res.status(200).send(paths);
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
});

router.post('/uploadProfile', (req, res) => {
  try {
    if (req.files.length <= 0) {
      return res
        .status(400)
        .send({ error: true, message: 'Debe subir al menos una imagen' });
    }
    let paths = [];
    req.files.forEach((file) => {
      const path = 'http://localhost:3000/img/profiles/' + file.filename;
      console.log(path);
      paths.push(path);
    });
    res.status(200).send(paths);
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
});

router.use('/general', generalRoutes);
router.use('/publications', publicationRoutes);
router.use('/chat', chatRoutes);

module.exports = router;
