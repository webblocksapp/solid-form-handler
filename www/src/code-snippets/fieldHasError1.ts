//@ts-nocheck
formHandler.fieldHasError('age');

//For nested objects you can access by dot notation
formHandler.fieldHasError('contact.email');

//For nested arrays too
formHandler.fieldHasError('contacts.0.email');
formHandler.fieldHasError('contacts[0]email');

//And fieldsets
formHandler.fieldHasError('0.contact.email');
formHandler.fieldHasError('0.contacts.0.email');
formHandler.fieldHasError('[0]contact.email');
formHandler.fieldHasError('[0]contacts[0]email');
