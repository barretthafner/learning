
$(document).ready(function(){

  var config = {
    selectors: {
      firstName: '.first-name',
      lastName: '.last-name',
      phoneNumbers: '.phone-number',
      addresses: '.addresses'
    }
  };

  var contactsDB = window.localStorage.getItem('contactsDB') || [];

  $('.contact-form').on('submit', function() {

    var contact = {
      id: contactsDB.length,
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      phoneNumbers: [
        $('#phoneNumber').val()
      ],
      addresses: [
        {
          street: $('#addressStreet').val(),
          city: $('#addressCity').val(),
          state: $('#addressState').val()
        }
      ]
    };

    contactsDB.push(contact);
    window.localStorage.setItem('contactsDB', contactsDB);
    this.reset();



    $('.contact-list').append('<li><a class="contact-link" data-id="' + contact.id + '" href="#">' + contact.firstName + ' ' + contact.lastName + '</a></li>');


    $('.contact-link').on('click', function(event){
      event.preventDefault();
      showContact($(event.target).attr('data-id'));
    });

    return false;
  });

  function showContact(id) {

    var contact;

    for (var i = 0; i < contactsDB.length; i++) {
      if(contactsDB[i].id === Number(id)) {
        contact = contactsDB[i];
        break;
      }
    }

    $(config.selectors.firstName).text(contact.firstName);
    $(config.selectors.lastName).text(contact.lastName);
    contact.phoneNumbers.forEach(function(number, index){
      $(config.selectors.phoneNumbers).html('').append('<li>Phone #' + (index + 1) + ': ' + number + '</li><hr/>');
    });
    contact.addresses.forEach(function(address, index){
      $(config.selectors.addresses).html('').append('<li><p>Address #' + (index + 1) + ':</p><p>Street: ' + address.street + '</p><p>City: ' + address.city + '</p><p>State: ' + address.state + '</p></li><hr/>');
    });
  }

});
