const e=`//@ts-nocheck
formHandler.getFieldValue('age');

//For nested objects you can access by dot notation
formHandler.getFieldValue('contact.email');

//For nested arrays too
formHandler.getFieldValue('contacts.0.email');
formHandler.getFieldValue('contacts[0]email');

//And fieldsets
formHandler.getFieldValue('0.contact.email');
formHandler.getFieldValue('0.contacts.0.email');
formHandler.getFieldValue('[0]contact.email');
formHandler.getFieldValue('[0]contacts[0]email');
`;export{e as default};
