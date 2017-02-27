;(function (global, $) {

  "use strict";

  // 'new' object creates a Greetr.init object
  var Greetr = function (firstName, lastName, language) {

    return new Greetr.init(firstName, lastName, language);
  };

  //  -------------------------------------------------------------------
  // private values ---------------------------

  var supportedLangs = ['en', 'es', 'de'];

  var greetings = {
    en: 'Hello',
    es: 'Hola',
    de: 'Guten Tag'
  };

  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos',
    de: 'Wilkommen'
  };

  var logMessages = {
    en: 'Logged in',
    es: 'Inició sesión',
    de: 'Gelogged'
  };

  //  -------------------------------------------------------------------
  // public functions
  Greetr.prototype = {

    fullName: function () {
      return this.firstName + ' ' + this.lastName;
    },

    validate: function () {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      }
    },

    greeting: function () {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },

    formalGreeting: function () {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },

    greet: function (formal) {
      var msg;

      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      return this;

    },

    log: function () {
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }
      return this;
    },

    setLang: function (lang) {
      this.language = lang;
      this.validate();
      return this;
    },

    HTMLGreeting: function (selector, formal) {
      if (!$) {
        throw 'jQuery not loaded';
      }

      if (!selector) {
        throw 'Missing jQuery selector';
      }

      var msg;
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      $(selector).html(msg);

      return this;
    }


  };


  // greetr.init creates an object with passed values and a specific language
  Greetr.init = function (firstName, lastName, language) {

    var self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';

    self.validate();

  };

  // attaches the Greetr.prototype to the Greetr.init.prototype
  // we want a Greetr object on the global object that creates
  // Greetr.init objects and these should have the same prototype
  Greetr.init.prototype = Greetr.prototype;

  // attach the Greetr object to the global object as 'Greetr' and 'G$'
  global.Greetr = global.G$ = Greetr;

}(window, jQuery));
