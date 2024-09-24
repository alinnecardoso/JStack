import HttpClient from "./utils/HttpClient";

class ContactsService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }
  async ListContacts(orderBy = 'asc') {
    return this.HttpClient.get(`/contacts/ebda7f7e-d811-4130-88be-5c5f244181fr?orderBy=${orderBy}`)
  }

  async createContact(contact){
    return this.HttpClient.post(`/contacts`, contact);
  }
}

export default new ContactsService();

// .then( async (response) => {
//   await delay(500);
//   return response.json();
// })
// .catch((error) => {
//   console.error('error', error)
//   })
// .finally(() => {
//   setIsLoading(false);
//   });
