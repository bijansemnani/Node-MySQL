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

function read(query, clean, funky) {
  console.log(query);
  console.log(clean);
  connection.query(query, clean, function (err, response) {
    if(err) throw err;
    funky(response);
  })
}

function recurPrompt(){
  inquire.prompt([
    {
      type:"list",
      name:"choice",
      message:"What would you like to do?",
      choices:["View Products for Sale",
               "View Low Inventory",
               "Add to Inventory",
               "Add New Product"
              ]
    }
  ]).then(function (answer) {
    console.log(answer);
    var query;
    switch (answer.choice) {
      case "View Products for Sale":
        query = "SELECT * FROM products";
        read(query, null, function (data) {
          for (var i = 1; i < data.length; i++) {
            console.log("Item: " + data[i].product_name
                    + ", Department: " + data[i].department_name
                    + ", Price: $" + data[i].price
                    + ", Quantity: " + data[i].stock_quantity);
            console.log("----------------------------------------------------------------------");        
          }
        });
        break;
      default:

    }
  });
}

recurPrompt();
