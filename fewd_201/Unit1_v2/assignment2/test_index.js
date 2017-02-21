
// Model -------------------------------------------------------------------

// create a new namespace to keep everything
var upperCaseBox = {};

upperCaseBox.Model = function () {
  this.text = "";
  this.onChange = null;
};

// Questions.....
// Why on the prototype?
upperCaseBox.Model.prototype.setTextUppercase = function (value) {

  console.log("2 - value from onInput " + value);
  //make the value uppercase
  this.text = value.toUpperCase();

  //if onChange exists pass it this.text
  //in the controller we will make this be setValue in the View
  if (this.onChange) {
    this.onChange(this.text);
  }
};


// View -------------------------------------------------------------------

// Questions.....
// Why initial Value?
upperCaseBox.View = function (elementId) {

  // Why do we have access to document here? Climbs the scope chain?
  this.element = document.getElementById(elementId);
  // could use setValue here, but why?
  this.element.value = "";
  this.onInput = null;

  //First 'this' applies to the View, second to the element, third the event?
  this.element.addEventListener('input', this._onInput.bind(this));
};

//Why the prototype again?
//Why the underscore?
upperCaseBox.View.prototype._onInput = function (event) {
  //Why create var value?
  //var value = event.target.value;

  if (this.onInput) {
    console.log("1 - event.target.value: " + event.target.value);
    this.onInput(event.target.value);
  }
};

// Again why prototype?
upperCaseBox.View.prototype.setValue = function (value) {
  console.log("3 - from onChange: " + value);
  this.element.value = value;
};


// Controller -------------------------------------------------------------------

upperCaseBox.Controller = function (model, view) {
  // make the view change model.text to whatever the input is but uppercase whenever an input is detected
  view.onInput = model.setTextUppercase.bind(model);
  // make the model update view.element.value whenever a change is detected
  model.onChange = view.setValue.bind(view);
};


document.addEventListener('DOMContentLoaded', function () {
  var model = new upperCaseBox.Model();
  console.log(model.text);
  // 'uppercase' is the id of the <input> html element in index.html
  var view = new upperCaseBox.View('uppercase');
  var controller = new upperCaseBox.Controller(model, view);

  // where are these objects stored?
});
