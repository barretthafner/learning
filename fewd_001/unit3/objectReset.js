var user = {
  name: 'mr smith',
  profession: 'dandy fella',
  age: 100000,
  reset: function () {
    for (var prop in this) {
      console.log(prop);
      if (prop !== 'reset') {
        this[prop] = null;
      }
    }
  }
};

console.log(user.name);
console.log(user.profession);
console.log(user.age);
console.log(user.reset);


user.reset();
//The result after the function is invoked should look like this:

console.log(user.name); //null
console.log(user.profession); //null
console.log(user.age); //null
console.log(user.reset);
