const CategoriesRepository = require('../repositories/CategoriesRepository')

class CategoryController {
  async index(request, response){
    //Listar todos os registros
    const categories = await CategoriesRepository.findAll();
    response.json(categories);

  }

  //teste

  //Criar um novo registro
  async store(request, response){
    const { name } = request.body;

    if(!name){
      return response.status(400).json({error: 'Name is required'})
    }

    const category = await CategoriesRepository.create({ name });

    response.status(201).json(category);
  }
}
module.exports = new CategoryController();
