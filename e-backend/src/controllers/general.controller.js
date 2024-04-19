const util = require('util');
const connection = require('../dbConnect');
const getConnection = require('../dbConnectU');

const generalController = {};

generalController.addFounds = async (req, res) => {
  const { id, money } = req.body;

  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);
  const queryMoney = `SELECT money FROM user WHERE id = ?`;
  const result = await dbQuery(queryMoney, [id]);

  if (result.length === 0) {
    return res
      .status(404)
      .send({ error: true, message: 'Usuario no encontrado' });
  }

  let moneyUser = parseFloat(result[0].money);
  moneyUser += parseFloat(money);

  const query = `UPDATE user SET money = ? WHERE id = ?`;

  connection.query(query, [moneyUser, id], (error, results, fields) => {
    if (error) {
      return res.status(500).send({ error: true, message: error.message });
    }

    res.status(200).send({ error: false, message: 'Fondos agregados' });
  });
};

generalController.registerUser = async (req, res) => {
  const { dpi, names, lastNames, user, email, password } = req.body;
  const query = `INSERT INTO user (dpi, name, lastname, username, email, password) VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [dpi, names, lastNames, user, email, password],
    (error, results, fields) => {
      if (error) {
        return res.status(500).send({ error: true, message: error.message });
      }

      res
        .status(200)
        .send({ error: false, message: 'Usuario registrado correctamente' });
    }
  );
};

generalController.loginUser = async (req, res) => {
  const { user, password } = req.body;
  const query = `SELECT id, dpi, username, name, lastName, coins, money, profile, role FROM user WHERE username = ? AND password = ?`;

  connection.query(query, [user, password], (error, results, fields) => {
    if (error) {
      return res.status(500).send({ error: true, message: error.message });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .send({ error: true, message: 'Usuario o contraseña incorrecta' });
    }

    res.status(200).send({ error: false, user: results[0] });
  });
};

generalController.getUser = async (req, res) => {
  const { id } = req.body;
  const query = `SELECT id, dpi, username, name, lastName, coins, money, profile, role FROM user WHERE id = ?`;

  connection.query(query, [id], (error, results, fields) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error: true, message: error.message });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .send({ error: true, message: 'Usuario no encontrado' });
    }

    res.status(200).send({ error: false, user: results[0] });
  });
};

generalController.createPublication = async (req, res) => {
  const {
    title,
    description,
    price,
    stock,
    type,
    tags,
    userId,
    quantityImages
  } = req.body;
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    // Split tags into an array
    const tagList = tags.split(',');

    // Insert publication
    const queryInsertPublication = `INSERT INTO publication (title, description, isVolunteering, priceM, priceCP, quantity, FK_User) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const fPrice = parseFloat(price);
    console.log('Tipo: ', type);
    const resultInsert = await dbQuery(queryInsertPublication, [
      title,
      description,
      type == 2 ? 1 : 0,
      type == 2 ? 0 : price,
      type == 2 ? price : (fPrice + fPrice * 0.4).toFixed(2),
      stock,
      userId
    ]);
    const idPublication = resultInsert.insertId;

    // Update images
    const queryGetImages = `SELECT id FROM image WHERE FK_User = ? ORDER BY id DESC LIMIT ?`;
    const images = await dbQuery(queryGetImages, [
      userId,
      parseInt(quantityImages)
    ]);
    const queryUpdateImages = `UPDATE image SET FK_Publication = ? WHERE id = ?`;
    for (let i of images) {
      await dbQuery(queryUpdateImages, [idPublication, i.id]);
    }

    // Insert tags
    const queryInsertTags = `INSERT INTO tag (name) VALUES (?)`;
    const queryVerifyTag = `SELECT id FROM tag WHERE name = ?`;
    for (let t of tagList) {
      t = t.toUpperCase();
      t = t.replace(/ /g, '');
      t = t.replace(/á/g, 'A');
      t = t.replace(/é/g, 'E');
      t = t.replace(/í/g, 'I');
      t = t.replace(/ó/g, 'O');
      t = t.replace(/ú/g, 'U');
      t = t.trim();
      const tag = await dbQuery(queryVerifyTag, t);
      let tagId = 0;
      if (tag.length > 0) {
        tagId = Number(tag[0].id);
      } else {
        const resultTagInsert = await dbQuery(queryInsertTags, t);
        tagId = Number(resultTagInsert.insertId);
      }

      const queryInsertPublicationTag = `INSERT INTO tagsofpublication (FK_Publication, FK_Tag) VALUES (?, ?)`;
      await dbQuery(queryInsertPublicationTag, [idPublication, tagId]);
    }

    const queryVerify = `SELECT COUNT(*) AS quantity FROM publication WHERE FK_User = ${userId} AND isApproved = 1;`;
    const resultVerify = await dbQuery(queryVerify);

    if (resultVerify[0].quantity >= 5) {
      const queryUpdateApproved = `UPDATE publication SET isApproved = 1 WHERE id = ${idPublication}`;
      await dbQuery(queryUpdateApproved);
    }

    res.status(200).send({ error: false, message: 'Publicación creada' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: true, message: error.message });
  }
};

generalController.changeProfileImage = async (req, res) => {
  console.log(req.body);
};

generalController.getCarouselPublication = (req, res) => {
  res.status(200).send({
    error: false,
    publications: [
      {
        id: 1,
        images: ['http://localhost:3000/img/pd/1.jpg'],
        title: 'Publicación 1',
        description: 'Descripción de la publicación 1',
        priceM: 100,
        category: 'Electronics'
      },
      {
        id: 2,
        images: ['http://localhost:3000/img/pd/4.jpg'],
        title: 'Publicación 2',
        description: 'Descripción de la publicación 2',
        priceM: 200,
        category: 'Books'
      },
      {
        id: 3,
        images: ['http://localhost:3000/img/pd/5.jpg'],
        title: 'Publicación 3',
        description: 'Descripción de la publicación 3',
        priceM: 300,
        category: 'Clothes'
      },
      {
        id: 4,
        images: ['http://localhost:3000/img/pd/6.jpg'],
        title: 'Publicación 4',
        description: 'Descripción de la publicación 4',
        priceM: 400,
        category: 'Furniture'
      },
      {
        id: 5,
        images: ['http://localhost:3000/img/pd/7.jpg'],
        title: 'Publicación 5',
        description: 'Descripción de la publicación 5',
        priceM: 500,
        category: 'Electronics'
      },
      {
        id: 6,
        images: ['http://localhost:3000/img/pd/44.jpg'],
        title: 'Publicación 6',
        description: 'Descripción de la publicación 6',
        priceM: 600,
        category: 'Books'
      },
      {
        id: 7,
        images: ['http://localhost:3000/img/pd/39.jpg'],
        title: 'Publicación 7',
        description: 'Descripción de la publicación 7',
        priceM: 700,
        category: 'Clothes'
      },
      {
        id: 8,
        images: ['http://localhost:3000/img/pd/29.jpg'],
        title: 'Publicación 8',
        description: 'Descripción de la publicación 8',
        priceM: 800,
        category: 'Furniture'
      },
      {
        id: 9,
        images: ['http://localhost:3000/img/pd/9.jpg'],
        title: 'Publicación 9',
        description: 'Descripción de la publicación 9',
        priceM: 900,
        category: 'Electronics'
      },
      {
        id: 10,
        images: ['http://localhost:3000/img/pd/10.jpg'],
        title: 'Publicación 10',
        description: 'Descripción de la publicación 10',
        priceM: 1000,
        category: 'Books'
      },
      {
        id: 11,
        images: ['http://localhost:3000/img/pd/11.jpg'],
        title: 'Publicación 11',
        description: 'Descripción de la publicación 11',
        priceM: 1100,
        category: 'Clothes'
      },
      {
        id: 12,
        images: ['http://localhost:3000/img/pd/12.jpg'],
        title: 'Publicación 12',
        description: 'Descripción de la publicación 12',
        priceM: 1200,
        category: 'Furniture'
      },
      {
        id: 13,
        images: ['http://localhost:3000/img/pd/13.jpg'],
        title: 'Publicación 13',
        description: 'Descripción de la publicación 13',
        priceM: 1300,
        category: 'Electronics'
      },
      {
        id: 14,
        images: ['http://localhost:3000/img/pd/14.jpg'],
        title: 'Publicación 14',
        description: 'Descripción de la publicación 14',
        priceM: 1400,
        category: 'Books'
      },
      {
        id: 15,
        images: ['http://localhost:3000/img/pd/15.jpg'],
        title: 'Publicación 15',
        description: 'Descripción de la publicación 15',
        priceM: 1500,
        category: 'Clothes'
      }
    ]
  });
};

module.exports = generalController;
