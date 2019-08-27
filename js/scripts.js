// Business Logic for AddressBook
// This will contain a list of Contact objects and store entries in our address book.
// Instantiate new AddressBooks with a currentId property
// - every time a new AddressBook is created, it will have a currentId property that begins at 0.
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

// takes Contact object as an argument.
// Creates an id property on a Contact object, and assigns it a unique ID,
// Incrementing value before pushing it to the contacts array in AddressBook.
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

// Returns the updated currentId.
AddressBook.prototype.assignId = function() {
  this.currentId++;
  return this.currentId;
}

// Loop through the AddressBook contacts array
// and check each enry's id against the id provided to the fincdContact() method
AddressBook.prototype.findContact = function(id) {
  for (let i = 0; i < this.contacts.length; i++) {
  // check if contact[i] exsits
    if(this.contacts[i]){
      if(this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

// Delete a contact with a matching ID and retunrs true,
// if there is no record with maatching id to delete, it returns false.
AddressBook.prototype.deleteContact = function(id) {
  for (let i = 0; i < this.contacts.length; i++) {
  // check if contact[i] exsits
    if(this.contacts[i]){
      if(this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
}


// A prototype to concatinate the first and last name from Contact object.
Contact.prototype.fullName = function() {
  return this.firstName + '' + this.lastName;
}


// User Interface logic
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
  htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

// Clear the input field
function clearInput() {
  $("input#new-first-name").val('');
  $("input#new-last-name").val('');
  $("input#new-phone-number").val('');
}

//Empty out the form field after submission:
function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  const buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
  }

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  // When a user click the button, the contact will be deleted.
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    // clearInput();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    clearInput();
    const newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
