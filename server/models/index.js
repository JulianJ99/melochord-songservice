const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
console.log(dbConfig.DB, dbConfig.HOST, dbConfig.dialect, dbConfig.USER, dbConfig.PASSWORD);
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.\n')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.songs = require("./songs.model")(sequelize, Sequelize);

module.exports = db;