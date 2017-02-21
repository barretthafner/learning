// An exercise to test javascript skills

// For your finished project you need to be able to:
//
//      Create diner objects which represent a single diner.
//      Add dishes to a diner's meal
//      Total up the cost of all of the diners' meals
//      Add a fixed tax percentage to the total bill
//      Add a percentage tip to the total bill
//      Split the bill fairly among the diners
//        Each diner should pay the tax on their own food
//        Each diner should pay an equal share of the tip (i changed this: each diner pays their gratuity on the bill total before tax)
//        If you choose to round the amounts, you may notice that the sum of the amounts does not equal the total bill amount anymore. Don't worry about that, or distribute the discrepancy in a fair way for an extra challenge.
//      Print out a total bill
//      Print a breakdown for what each diner owes

var round = require("./round");
var round2 = function (value) {
  return round(value, 2);
};

var TAX_RATE = .09;

var Dish = function(name, cost) {
  this.name = name;
  this.cost = cost;
};

var Diner = function(name, gratuityRate) {
  this.name = name;
  this.dishes = [];
  this.subTotal = 0;
  this.tax = 0;
  this.gratuityRate = gratuityRate;
  this.gratuity = 0;
};

Diner.prototype.addDish = function(dish) {
  this.dishes.push(dish);
  this.subTotal += dish.cost;
};

Diner.prototype.calculateBill = function(taxRate, portionOfTotal) {
  this.tax = round2(this.subTotal * taxRate);
  this.gratuity = round2(this.gratuityRate * portionOfTotal);
};

var Group = function(diners) {
  this.diners = diners;
  this.total = 0;
};


Group.prototype.finishMeal = function (taxRate) {
  var subTotal = 0;
  var numDiners = this.diners.length;
  this.diners.forEach(function(diner){
    subTotal += diner.subTotal;
  });
  
  this.diners.forEach(function (diner) {
    diner.calculateBill(taxRate, (subTotal/numDiners));
    subTotal += diner.tax + diner.gratuity;
  });
  this.total = subTotal;
};

Group.prototype.printTotal = function() {
  console.log("The total bill is: $" + this.total);
};

Group.prototype.printBreakdown = function() {
  this.diners.forEach(function(diner) {
    console.log(diner.name + " had:");
    diner.dishes.forEach(function(dish){
      console.log(dish.name + " which costs: $" + dish.cost);
    });
    console.log("That's $" + diner.subTotal);
    console.log("Plus $" + diner.tax + " tax, and");
    console.log("$" + diner.gratuity + " gratuity");
    console.log("That's $" + round2(diner.subTotal + diner.tax + diner.gratuity) + " total");
    console.log("==============================");
  });
};

var menu = [
  new Dish("Lasagna", 12.99),
  new Dish("Pizza", 11.99),
  new Dish("Salad", 13.55),
  new Dish("Wine, glass", 8.99),
  new Dish("Wine, bottle", 23.99)
];

var party = [
  new Diner("Bill", .20),
  new Diner("Sally", .25),
  new Diner("Phil", .15),
  new Diner("Karen", .18),
  new Diner("Harriet", .20)
];

var table7 = new Group(party);

table7.diners[0].addDish(menu[0]);
table7.diners[0].addDish(menu[3]);
table7.diners[1].addDish(menu[1]);
table7.diners[1].addDish(menu[2]);
table7.diners[1].addDish(menu[3]);
table7.diners[2].addDish(menu[2]);
table7.diners[2].addDish(menu[4]);
table7.diners[3].addDish(menu[0]);
table7.diners[3].addDish(menu[3]);
table7.diners[4].addDish(menu[1]);

table7.finishMeal(TAX_RATE);

table7.printTotal();
console.log("--------------------");
table7.printBreakdown();




