// Business Logic
function AddressBook() {
    this.contacts = [],
    this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
    contact.id = this.assignId();
    this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
    this.currentId++;
    return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
    for (let i = 0; i < this.contacts.length; i++) {
        if(this.contacts[i]){
            if(this.contacts[i].id == id) {
                return this.contacts[i];
            }
        }
    };
    return false;
}

AddressBook.prototype.deleteContact = function(id) {
    for (let i = 0; i < this.contacts.length; i++) {
        if(this.contacts[i]){
            if(this.contacts[i].id == id) {
                delete this.contacts[i];
                return true;
            }
        }
    };
    return false;
}

// constructor
function Contact (firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
    return this.firstName + this.lastName;
}

// User Interface logic
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
    let contactsList = $("ul#contacts");
    let htmlForContactInfo = '';
    addressBookToDisplay.contacts.forEach(contact => {
        htmlForContactInfo += `<li id="${contact.id}">${contact.firstName} ${contact.lastName}</li>`;
    });
    contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
    var contact = addressBook.findContact(contactId);
    $("#show-contact").show();
    $(".first-name").html(contact.firstName);
    $(".last-name").html(contact.lastName);
    $(".phone-number").html(contact.phoneNumber);
    var buttons = $("#buttons");
    buttons.empty();
    buttons.append(`<button class="deleteButton btn btn-info" id="${contact.id}">Delete</button>`);
  }

function attachContactListeners() {
    $("ul#contacts").on("click", "li", function() {
        showContact(this.id);
    });
    // When a user click the button, the contact will be deleted.
    $("#buttons").on("click", ".deleteButton", function() {
        addressBook.deleteContact(this.id);
        $("show-contact").hide();
        displayContactDetails(addressBook);
    });
};

$(document).ready(function() {
    attachContactListeners();
    $("form#new-contact").submit(function(event) {
        event.preventDefault();
        let inputtedFirstName = $("input#new-first-name").val();
        let inputtedLastName = $("input#new-last-name").val();
        let inputtedPhoneNumber = $("input#new-phone-number").val();

        //Empty out the form field after submission:
        $("input#new-first-name").val('');
        $("input#new-last-name").val('');
        $("input#new-phone-number").val('');

        const newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
        addressBook.addContact(newContact);
        displayContactDetails(addressBook);
    });
});
