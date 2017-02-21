var House = {
  bedrooms: 2,
  bathrooms: 1,
  printSize: function () {
    console.log(this.bedrooms, this.bathrooms);
  }
};

var Mansion = Object.create(House);

Mansion.bedrooms = 10;
Mansion.bathrooms = 5;


var Castle = Object.create(Mansion);

Castle.bedrooms = 25;
Castle.bathrooms = 15;

House.printSize();
Mansion.printSize();
Castle.printSize();
