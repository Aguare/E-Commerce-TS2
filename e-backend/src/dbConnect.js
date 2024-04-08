const mysql = require('mysql');

const dbConfig = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'maya',
  password: 'mmss14',
  database: 'mayamarketbd',
  multipleStatements: true,
  supportBigNumbers: true,
  bigNumberStrings: true,
  typeCast: true
};

const connection = mysql.createPool(dbConfig);

connection.getConnection((error) => {
  if (error) {
    console.error('Error connecting to database: ', error);
    return;
  }

  console.log('Connection to database established');
});

module.exports = connection;
