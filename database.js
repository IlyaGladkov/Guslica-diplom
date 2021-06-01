const { Pool } = require("pg");

module.exports = new Pool({
  user: "postgres",
  host: "aws-guslica.cj5u5kkgeyd9.us-east-1.rds.amazonaws.com",
  database: "postgres",
  password: "3ZeKSuAtm6sMnRbfDXlw",
  port: 5432,
});
