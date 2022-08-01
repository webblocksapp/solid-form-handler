//@ts-nocheck
formHandler.isFieldInvalid('age');

//For nested objects you can access by dot notation
formHandler.isFieldInvalid('contact.email');

//For nested arrays too
formHandler.isFieldInvalid('contacts.0.email');
formHandler.isFieldInvalid('contacts[0]email');

//And fieldsets
formHandler.isFieldInvalid('0.contact.email');
formHandler.isFieldInvalid('0.contacts.0.email');
formHandler.isFieldInvalid('[0]contact.email');
formHandler.isFieldInvalid('[0]contacts[0]email');
