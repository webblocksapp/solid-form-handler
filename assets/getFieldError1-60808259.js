const r=`//@ts-nocheck
formHandler.getFieldError('age');

//For nested objects you can access by dot notation
formHandler.getFieldError('contact.email');

//For nested arrays too
formHandler.getFieldError('contacts.0.email');
formHandler.getFieldError('contacts[0]email');

//And fieldsets
formHandler.getFieldError('0.contact.email');
formHandler.getFieldError('0.contacts.0.email');
formHandler.getFieldError('[0]contact.email');
formHandler.getFieldError('[0]contacts[0]email');
`;export{r as default};
//# sourceMappingURL=getFieldError1-60808259.js.map
