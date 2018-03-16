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
  read(queryAll, null, function (data) {
    var stringArray = [];
    for (var i = 0; i < data.length; i++){
      stringArray.push(data[i].product_name);
    }
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
      },
      {
        type:"list",
        name:"item",
        message:"What item would you like to add?",
        choices: stringArray,
        when: function (answer) {
          return answer.choice === "Add to Inventory"
        }
      },
      {
        name:"quantity",
        message:"How much?",
        when: function (answer) {
          return answer.choice === "Add to Inventory"
        }
      },
      {
        name:"newProduct",
        message:"What would you like to add?",
        when: function (answer) {
          return answer.choice === "Add New Product"
        }
      },
      {
        name:"newDepart",
        message:"Which department?",
        when: function (answer) {
          return answer.choice === "Add New Product"
        }
      },
      {
        name:"newPrice",
        message:"How much?",
        when: function (answer) {
          return answer.choice === "Add New Product"
        }
      },
      {
        name:"newQuantity",
        message:"How many?",
        when: function (answer) {
          return answer.choice === "Add New Product"
        }
      }
    ]).then(function (answer) {
      console.log(answer);
      var query;

      if(answer.choice === "View Products for Sale"){
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
      }

      if(answer.choice === "View Low Inventory"){
        query = "SELECT * FROM products WHERE stock_quantity < 5";
        read(query, null, function (data) {

          if(data.length > 0){
            console.log(data);
          } else {
            console.log("There are no items that are low");
          }

        });
      }

      if(answer.choice === "Add to Inventory"){
        var id = 0;
        var product;

        for (var i = 0; i < data.length; i++) {
          if (answer.item === data[i].product_name) {
            id = data[i].item_id;
            product = data[i];
            console.log(product.stock_quantity);
          }
        }
        
        product.stock_quantity += parseInt(answer.quantity);
        query = "UPDATE products SET ? WHERE ?";

        var cleaning = [{stock_quantity:product.stock_quantity},
                        {item_id:id}
        ];

        read(query, cleaning, function (data) {
          console.log("Updated!!!");
        });
      }

      if (answer.choice === "Add New Product") {
        console.log(answer);
        query = "INSERT INTO products SET ?";

        var cleaning =
        {
          product_name: answer.newProduct,
          department_name: answer.newDepart,
          price: answer.newPrice,
          stock_quantity: answer.newQuantity
        };

        read(query, cleaning, function (data) {
          console.log("Inserted!!!");
        });
      }
    });
  });
}

recurPrompt();
