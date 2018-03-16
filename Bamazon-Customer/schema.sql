CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  item_id INTEGER AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50),
  price DECIMAL(10,2),
  stock_quantity INTEGER,
  PRIMARY KEY (item_id)
);

INSERT INTO products
SET product_name = "games", department_name = "electronics", price = 60, stock_quantity = 100;

INSERT INTO products
SET product_name = "apples", department_name = "food", price = 3, stock_quantity = 200;

INSERT INTO products
SET product_name = "sofa", department_name = "furniture", price = 300, stock_quantity = 10;

INSERT INTO products
SET product_name = "speakers", department_name = "electronics", price = 100, stock_quantity = 50;

INSERT INTO products
SET product_name = "soap", department_name = "bathroom_appliances", price = 1, stock_quantity = 400;

INSERT INTO products
SET product_name = "cereal", department_name = "food", price = 5, stock_quantity = 100;

INSERT INTO products
SET product_name = "rake", department_name = "gardening", price = 3, stock_quantity = 200;

INSERT INTO products
SET product_name = "shoes", department_name = "clothing", price = 60, stock_quantity = 50;

INSERT INTO products
SET product_name = "shirts", department_name = "clothing", price = 15.50, stock_quantity = 200;

INSERT INTO products
SET product_name = "basketball", department_name = "sports", price = 25, stock_quantity = 150;
