module.exports = {
    HOST: "118.67.142.229",
    USER: "root",
    PASSWORD: "1234",
    DB: "papdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };