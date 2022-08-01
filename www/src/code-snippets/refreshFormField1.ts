//@ts-nocheck
formHandler.refreshFormField('age');

//For nested objects you can access by dot notation
formHandler.refreshFormField('contact.email');

//For nested arrays too
formHandler.refreshFormField('contacts.0.email');
formHandler.refreshFormField('contacts[0]email');

//And fieldsets
formHandler.refreshFormField('0.contact.email');
formHandler.refreshFormField('0.contacts.0.email');
formHandler.refreshFormField('[0]contact.email');
formHandler.refreshFormField('[0]contacts[0]email');
