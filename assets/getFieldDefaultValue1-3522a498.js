const e=`//@ts-nocheck
formHandler.getFieldDefaultValue('age');

//For nested objects you can access by dot notation
formHandler.getFieldDefaultValue('contact.email');

//For nested arrays too
formHandler.getFieldDefaultValue('contacts.0.email');
formHandler.getFieldDefaultValue('contacts[0]email');

//And fieldsets
formHandler.getFieldDefaultValue('0.contact.email');
formHandler.getFieldDefaultValue('0.contacts.0.email');
formHandler.getFieldDefaultValue('[0]contact.email');
formHandler.getFieldDefaultValue('[0]contacts[0]email');
`;export{e as default};
//# sourceMappingURL=getFieldDefaultValue1-3522a498.js.map
