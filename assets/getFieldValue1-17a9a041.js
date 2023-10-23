const getFieldValue1 = "//@ts-nocheck\nformHandler.getFieldValue('age');\n\n//For nested objects you can access by dot notation\nformHandler.getFieldValue('contact.email');\n\n//For nested arrays too\nformHandler.getFieldValue('contacts.0.email');\nformHandler.getFieldValue('contacts[0]email');\n\n//And fieldsets\nformHandler.getFieldValue('0.contact.email');\nformHandler.getFieldValue('0.contacts.0.email');\nformHandler.getFieldValue('[0]contact.email');\nformHandler.getFieldValue('[0]contacts[0]email');\n";

export { getFieldValue1 as default };
