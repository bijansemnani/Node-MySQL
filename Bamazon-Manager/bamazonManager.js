var mysql = require("mysql");
var inquire = require("inquirer");

var queryAll = "SELECT * FROM products";

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});
