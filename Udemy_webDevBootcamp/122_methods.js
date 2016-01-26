//add(x,y) is a method, meaning it is a function inside of an object
var obj = {
	name: "Chuck",
	age: 45,
	isCool: undefined,
	friends: ["bob", "tina"],
	add: function(x,y) {
		return x + y;
	}
};


//The below creates a name space colision
function speak() {
	return "WOOF!";
}
function speak() {
	return "MEOW!";
}



//The below avoids namespace colisions
var dogSpace = {};
dogSpace.speak = function(){
	return "WOOF!";
}

var catSpace = {};
catSpace.speak = function() {
	return "MEOW!";
}

//this object
var comments = {};

comments.data = ["Good Job!", "Bye", "Lame..."];

comments.print = function(){
	this.data.forEach(function (el) {
		console.log(el);
	});
}

