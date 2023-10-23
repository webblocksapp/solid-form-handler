const isFieldInvalid1 = "//@ts-nocheck\nformHandler.isFieldInvalid('age');\n\n//For nested objects you can access by dot notation\nformHandler.isFieldInvalid('contact.email');\n\n//For nested arrays too\nformHandler.isFieldInvalid('contacts.0.email');\nformHandler.isFieldInvalid('contacts[0]email');\n\n//And fieldsets\nformHandler.isFieldInvalid('0.contact.email');\nformHandler.isFieldInvalid('0.contacts.0.email');\nformHandler.isFieldInvalid('[0]contact.email');\nformHandler.isFieldInvalid('[0]contacts[0]email');\n";

export { isFieldInvalid1 as default };
