const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  user: 'maya',
  password: 'mmss14',
  database: 'mayamarketbd',
  connectionLimit: 10 
};

const pool = mysql.createPool(dbConfig);

function getConnection() {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        return reject(error);
      }
      resolve(connection);
    });
  });
}

module.exports = getConnection;
