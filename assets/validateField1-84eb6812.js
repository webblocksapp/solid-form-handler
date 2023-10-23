const a=`//@ts-nocheck
formHandler.validateField('age');

//For nested objects you can access by dot notation
formHandler.validateField('contact.email');

//For nested arrays too
formHandler.validateField('contacts.0.email');
formHandler.validateField('contacts[0]email');

//And fieldsets
formHandler.validateField('0.contact.email');
formHandler.validateField('0.contacts.0.email');
formHandler.validateField('[0]contact.email');
formHandler.validateField('[0]contacts[0]email');
`;export{a as default};
//# sourceMappingURL=validateField1-84eb6812.js.map
