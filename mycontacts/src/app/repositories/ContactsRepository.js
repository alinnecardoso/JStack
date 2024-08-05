const { v4 } = require('uuid');

const contacts = [
  {
    id: v4(),
    name: 'Alinne',
    email: 'alinne@gmail.com',
    phone: '123456789',
    category_id: v4(),
  }
];

class ContactsRepository{
  findAll(){
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
