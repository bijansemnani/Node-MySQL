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

function continuePrompt() {
  inquire.prompt([
    {
      type:"confirm",
      name:"continue",
      message:"Would you like to purchase something else?"
    }
  ]).then( function (answer) {
    if(answer.continue === true){
      recurPrompt();
    } else {
      console.log("Thank you come again!!!!");
      connection.end();
    }
  });
}

function recurPrompt() {
  read(queryAll, null, function (data) {
    var stringArray = [];
    for (var i = 0; i < data.length; i++){
      stringArray.push(data[i].product_name);
    }
    inquire.prompt([
      {
        type:"list",
        name:"product",
        message:"Select a product to purchase",
        choices: stringArray
      },
      {
        name:"quantity",
        message:"How many?"
      }
    ]).then(function (answer) {
      console.log(answer);
      var id = 0;
      var product;
      for (var i = 0; i < data.length; i++) {
        if (answer.product === data[i].product_name) {
          id = data[i].item_id;
          product = data[i];
          console.log(product.stock_quantity);
        }
      }

      if(answer.quantity <= product.stock_quantity){
        product.stock_quantity -= answer.quantity;
        var newQuery = "UPDATE products SET ? WHERE ?";
        var cleaning = [{stock_quantity: product.stock_quantity},
                        {item_id:id}];
        read(newQuery,cleaning, function () {
          console.log("Updated!");
          var total = product.price * answer.quantity;
          console.log("Your total is: " + total);
          continuePrompt();
        });
      } else {
        console.log("Not enough product");
        continuePrompt();
      }
    });
  });
}

recurPrompt();
