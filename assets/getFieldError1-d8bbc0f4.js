const getFieldError1 = "//@ts-nocheck\nformHandler.getFieldError('age');\n\n//For nested objects you can access by dot notation\nformHandler.getFieldError('contact.email');\n\n//For nested arrays too\nformHandler.getFieldError('contacts.0.email');\nformHandler.getFieldError('contacts[0]email');\n\n//And fieldsets\nformHandler.getFieldError('0.contact.email');\nformHandler.getFieldError('0.contacts.0.email');\nformHandler.getFieldError('[0]contact.email');\nformHandler.getFieldError('[0]contacts[0]email');\n";

export { getFieldError1 as default };
