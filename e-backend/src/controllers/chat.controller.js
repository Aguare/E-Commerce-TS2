const util = require('util');
const connection = require('../dbConnect');

const chatController = {};

chatController.getConversations = async (req, res) => {
  const { idUser } = req.body;
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const queryConversations = `SELECT c.id,
                                    c.FK_User1,
                                    u.name     AS user1,
                                    u.profile  AS profile1,
                                    c.FK_User2,
                                    u2.name    AS user2,
                                    u2.profile AS profile2,
                                    (SELECT m.message
                                    FROM message m
                                    WHERE m.FK_Conversation = c.id
                                    ORDER BY m.created_at DESC
                                    LIMIT 1)  AS last_message,
                                    (SELECT DATE_FORMAT(m.created_at, '%Y-%m-%d %H:%i:%s')
                                    FROM message m
                                    WHERE m.FK_Conversation = c.id
                                    ORDER BY m.created_at DESC
                                    LIMIT 1)                        AS last_date,
                                    (SELECT COUNT(*)
                                    FROM message m
                                    WHERE m.FK_Conversation = c.id) AS count
                                FROM conversation c
                                    LEFT JOIN user u ON u.id = c.FK_User1
                                    LEFT JOIN user u2 ON u2.id = c.FK_User2
                                WHERE c.FK_User1 = ?
                                OR c.FK_User2 = ?;`;
    const conversations = await dbQuery(queryConversations, [idUser, idUser]);
    res.status(200).send({ error: false, conversations });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

chatController.getMessages = async (req, res) => {
  const { idConversation } = req.body;
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const queryMessages = `SELECT m.id,
                                    m.FK_User,
                                    u.name    AS user,
                                    u.profile AS profile,
                                    m.message,
                                    DATE_FORMAT(m.created_at, '%Y-%m-%d %H:%i:%s') AS created_at
                                FROM message m
                                    LEFT JOIN user u ON u.id = m.FK_User
                                WHERE m.FK_Conversation = ?
                                ORDER BY m.created_at ASC;`;
    const messages = await dbQuery(queryMessages, [idConversation]);
    res.status(200).send({ error: false, messages });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

chatController.sendMessage = async (req, res) => {
  const { idConversation, idUser, message } = req.body;
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const querySendMessage = `INSERT INTO message (FK_Conversation, FK_User, message)
                                    VALUES (?, ?, ?);`;
    await dbQuery(querySendMessage, [idConversation, idUser, message]);
    res.status(200).send({ error: false, message: 'Mensaje enviado' });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

chatController.createConversation = async (req, res) => {
  const { idUser1, idUser2 } = req.body;
  const db = connection;
  const dbQuery = util.promisify(db.query).bind(db);

  try {
    const queryVerifyConversation = `SELECT id FROM conversation c WHERE (c.FK_User1 = ? AND c.FK_User2 = ?) OR (c.FK_User1 = ? AND c.FK_User2 = ?);`;
    const conversation = await dbQuery(queryVerifyConversation, [
      idUser1,
      idUser2,
      idUser2,
      idUser1
    ]);
    if (conversation.length > 0) {
      return res
        .status(200)
        .send({ error: false, message: 'Conversación ya existe' });
    } else {
      const queryCreateConversation = `INSERT INTO conversation (FK_User1, FK_User2)
                                        VALUES (?, ?);`;
      await dbQuery(queryCreateConversation, [idUser1, idUser2]);
      res.status(200).send({ error: false, message: 'Conversación creada' });
    }
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

module.exports = chatController;
