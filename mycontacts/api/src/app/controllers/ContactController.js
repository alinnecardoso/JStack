const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController{
   async index(request, response){
    //Listar todos os registros
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response){
    //Obter UM registro
    const { id } = request.params;

    console.log('True or False: ', id)
    const contact = await ContactsRepository.findById(id);
    console.log(contact)

    if(contact === false){
      // 404: Not Found
      return response.status(404).json({ error : 'Contact not found' });
    }

    return response.json(contact);
  }

  async store(request, response){
    //Criar um novo registro
    const { name, email, phone, category_id  } = request.body;

    if(!name){
      return response.status(400).json({error: 'Name is required'})
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if(contactExists){
      return response.status(400).json({error: 'This email is already in use'})
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    })

    response.status(201).json(contact);
  }

  async update(request, response){
    //Editar um registro
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if(!contactExists){
      return response.status(404).json({error: 'User not found'})
    }

    if(!name){
      return response.status(400).json({error: 'Name is required'})
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if(contactByEmail  && contactByEmail.id !== id){
      return response.status(400).json({error: 'This email is already in use'})
    }

    const contact = await ContactsRepository.update(id,{
      name, email, phone, category_id,
    })

    response.json(contact);
  }

  async delete(request, response){
    //Deletar um registro
    const { id } = request.params;

    await ContactsRepository.delete(id);
    // 204: No Content
    response.sendStatus(204);
  }
}

//singleton
module.exports = new ContactController();
