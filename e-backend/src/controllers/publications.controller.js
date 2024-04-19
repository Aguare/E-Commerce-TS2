const util = require('util');
const connection = require('../dbConnect');
const getConnection = require('../dbConnectU');

const publicationController = {};

publicationController.getListPublications = async (req, res) => {
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const { id } = req.body;
    const query = `SELECT id, title, isVolunteering, isApproved, created_at FROM publication WHERE FK_User = ?`;
    const publications = await dbQuery(query, [id]);
    res.status(200).send({ error: false, publications });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

publicationController.getListPublicationsAdmin = async (req, res) => {
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const { onlyPending } = req.body;
    const query = `SELECT id, title, isVolunteering, isApproved, created_at FROM publication ${
      onlyPending ? "WHERE isApproved = 'pending'" : ''
    } ORDER BY created_at ASC;`;
    const publications = await dbQuery(query);
    res.status(200).send({ error: false, publications });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

publicationController.updateStatusPublication = async (req, res) => {
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const { id, status } = req.body;
    const query = `UPDATE publication SET isApproved = ? WHERE id = ?`;
    await dbQuery(query, [status, id]);
    res.status(200).send({ error: false, message: 'Publication updated' });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

publicationController.deletePublication = async (req, res) => {
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const { id } = req.body;
    const query = `DELETE FROM publication WHERE id = ?`;
    const queryTags = `DELETE FROM tagsofpublication WHERE FK_Publication = ?`;
    const queryImages = `DELETE FROM image WHERE FK_Publication = ?`;
    await dbQuery(queryImages, [id]);
    await dbQuery(queryTags, [id]);
    await dbQuery(query, [id]);
    res.status(200).send({ error: false, message: 'Publication deleted' });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

publicationController.getPublication = async (req, res) => {
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const { id } = req.body;
    const queryPublication = `SELECT * FROM publication WHERE id = ?`;
    const queryImages = `SELECT id, path FROM image WHERE FK_Publication = ?`;
    const queryTags = ` SELECT t.name AS tag
                        FROM tagsofpublication top
                                LEFT JOIN tag t ON t.id = top.FK_Tag
                        WHERE top.FK_Publication = ?;`;

    const images = await dbQuery(queryImages, [id]);
    const tags = await dbQuery(queryTags, [id]);
    const publication = await dbQuery(queryPublication, [id]);

    let volunteering = [];
    if (publication[0].isVolunteering){
      const queryVolunteering = `SELECT FK_User AS user FROM volunteering v WHERE FK_Publication = ?;`;
      volunteering = await dbQuery(queryVolunteering, [id]);
    }

    res.status(200).send({ error: false, publication, images, tags, volunteering });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

publicationController.buy_list = async (req, res) => {
  const { id } = req.body;
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const query = `SELECT * FROM buy b LEFT JOIN publication p ON b.FK_Publication = p.id WHERE b.FK_User = ? AND p.isVolunteering = 0;`;
    const buys = await dbQuery(query, [id]);
    res.status(200).send({ error: false, buys });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

publicationController.volunteering_list = async (req, res) => {
  const { id } = req.body;
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const query = `SELECT * FROM volunteering v LEFT JOIN publication p ON v.FK_Publication = p.id WHERE v.FK_User = ? AND p.isVolunteering = 1;`;
    const volunteering = await dbQuery(query, [id]);
    res.status(200).send({ error: false, volunteering });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

publicationController.deleteVolunteering = async (req, res) => {
  const { id } = req.body;
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const query = `UPDATE volunteering SET status = 'canceled' WHERE id = ?`;
    await dbQuery(query, [id]);
    res.status(200).send({ error: false, message: 'Volunteering deleted' });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

publicationController.deleteBuy = async (req, res) => {
  const { id } = req.body;
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const queryBuy = `SELECT * FROM buy WHERE id = ?`;
    const buy = await dbQuery(queryBuy, [id]);
    if (buy.length === 0) {
      return res.status(404).send({ error: true, message: 'Buy not found' });
    } else {
      const queryUpdateBuy = `UPDATE publication SET isSold = 0 WHERE id = ?`;
      await dbQuery(queryUpdateBuy, [buy[0].FK_Publication]);
    }
    const query = `UDPATE buy SET status = 'canceled' WHERE id = ?`;
    await dbQuery(query, [id]);
    res.status(200).send({ error: false, message: 'Buy deleted' });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

publicationController.getCoupAvailableVolunteering = async (req, res) => {
  const { idPublication } = req.body;
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const query = `SELECT COUNT(*) AS registered, (SELECT quantity FROM publication WHERE id = ?) AS available
                  FROM volunteering v
                  WHERE FK_Publication = ?;`;
    const coups = await dbQuery(query, [idPublication, idPublication]);
    res.status(200).send({ error: false, coups });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

publicationController.register_buy = async (req, res) => {
  const { idPublication, idUser, amount, withMoney, coins, money } = req.body;
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const query = `INSERT INTO buy (FK_Publication, FK_User, amount, withMoney) VALUES (?, ?, ?, ?)`;
    await dbQuery(query, [idPublication, idUser, amount, withMoney]);
    const queryUpdatePublication = `UPDATE publication SET isSold = 1 WHERE id = ?`;
    await dbQuery(queryUpdatePublication, [idPublication]);
    if (withMoney) {
      let saldo = money - amount;
      const queryUpdateUser = `UPDATE user SET money = ? WHERE id = ?`;
      await dbQuery(queryUpdateUser, [saldo, idUser]);
    } else {
      let saldo = coins - amount;
      const queryUpdateUser = `UPDATE user SET coins = ? WHERE id = ?`;
      await dbQuery(queryUpdateUser, [saldo, idUser]);
    }
    res.status(200).send({ error: false, message: 'Buy registered' });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

publicationController.register_volunteering = async (req, res) => {
  const { idPublication, idUser, amount } = req.body;

  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const query = `INSERT INTO volunteering (FK_Publication, FK_User, amount) VALUES (?, ?, ?)`;
    await dbQuery(query, [idPublication, idUser, amount]);
    res.status(200).send({ error: false, message: 'Volunteering registered' });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

module.exports = publicationController;
