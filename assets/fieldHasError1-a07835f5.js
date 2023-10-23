const fieldHasError1 = "//@ts-nocheck\nformHandler.fieldHasError('age');\n\n//For nested objects you can access by dot notation\nformHandler.fieldHasError('contact.email');\n\n//For nested arrays too\nformHandler.fieldHasError('contacts.0.email');\nformHandler.fieldHasError('contacts[0]email');\n\n//And fieldsets\nformHandler.fieldHasError('0.contact.email');\nformHandler.fieldHasError('0.contacts.0.email');\nformHandler.fieldHasError('[0]contact.email');\nformHandler.fieldHasError('[0]contacts[0]email');\n";

export { fieldHasError1 as default };
