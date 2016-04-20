
$(document).ready(function(){

  var contactsDB = [];

  $('.contact-form button').on('click', function(event) {
    event.preventDefault();

    var contact = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      phoneNumber: $('#phoneNumber').val(),
      address: {
        street: $('#addressStreet').val(),
        city: $('#addressCity').val(),
        state: $('#addressState').val()
      }
    };

    contactsDB.push(contact);
    console.log(contactsDB);


    $('.contact-list').append('<li><a href="#">' + contact.firstName + ' ' + contact.lastName + '</a></li>');

  });




});
