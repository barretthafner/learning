var faker = require("faker");

var products = [];

for(var i = 1; i <= 10; i++){
    products[i] = {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    hack: faker.hacker.phrase(),
        
    };
}

products.forEach(function(item) {
    console.log("Buy a " + item.name + "! Prices starting at only $" + item.price + "!");
    console.log("Dectecting an issue with your computer!!!! Here's some advice: ");
    console.log(item.hack);
});