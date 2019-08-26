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

const displayContactDetails = addressBookToDisplay => {
    let contactsList = $("ul#contacts");
    let htmlForContactInfo = '';
    addressBookToDisplay.contacts.forEach(contact => {
        htmlForContactInfo += `<li id="${contact.id}">${contact.firstName} ${contact.lastName}</li>`;
    });
    contactsList.html(htmlForContactInfo);
}

const attachContactListeners = () => {
    $("ul#contacts").on("click", "li", () => {
        console.log(`The id of this <li> is ${this.id}.`);
    })
}

$(document).ready(function() {
    attachContactListeners();
    $("form#new-contact").submit(function(event) {
        event.preventDefault();
        let inputtedFirstName = $("input#new-first-name").val();
        let inputtedLastName = $("input#new-last-name").val();
        let inputtedPhoneNumber = $("input#new-phone-number").val();
        const newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
        addressBook.addContact(newContact);
        displayContactDetails(addressBook);
    });
});