const Sequelize = require('sequelize');
const connectionToMySQL = new Sequelize('corp_db', 'hari', 'Gerrard08', {
  host: '127.0.0.1',
  dialect: 'mysql',
  define: {
        timestamps: false
    }
});
connectionToMySQL
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = {connectionToMySQL};
