//@ts-nocheck
const { formData } = formHandler;

console.log(formData().name); //''
console.log(formData().contact); //{ email: '', phone: '' }
console.log(formData().contact.email); //''
console.log(formData().contact.phone); //''
console.log(formData());
/**
 * -- Output: --
 * { name: '', contact: { email: '', phone: '' } }
 */

formHandler.fillForm({
  name: 'Google',
  contact: { email: 'google@gmail.com', phone: '1112223' },
});
console.log(formData().name); //'Google'
console.log(formData().contact); //{ email: 'google@gmail.com', phone: '1112223' }
console.log(formData().contact.email); //'google@gmail.com'
console.log(formData().contact.phone); //'1112223'
console.log(formData());
/**
 * -- Output: --
 * { name: 'Google', contact: { email: 'google@gmail.com', phone: '1112223' } }
 */
