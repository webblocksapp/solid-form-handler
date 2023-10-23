const validateField1 = "//@ts-nocheck\nformHandler.validateField('age');\n\n//For nested objects you can access by dot notation\nformHandler.validateField('contact.email');\n\n//For nested arrays too\nformHandler.validateField('contacts.0.email');\nformHandler.validateField('contacts[0]email');\n\n//And fieldsets\nformHandler.validateField('0.contact.email');\nformHandler.validateField('0.contacts.0.email');\nformHandler.validateField('[0]contact.email');\nformHandler.validateField('[0]contacts[0]email');\n";

export { validateField1 as default };
