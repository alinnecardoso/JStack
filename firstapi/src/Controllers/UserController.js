let users = require('../mocks/users');

module.exports  = {
  listUsers(request, response){
    const { order } = request.query;

    const sortedUsers = users.sort((a, b) =>{
      if(order === 'desc'){
        // Se a.id for menor que b.id retorna 1 senão -1
        return a.id < b.id ? 1: -1;
      }
      return a.id > b.id ? 1: -1;
    })
    response.send(200, sortedUsers);
  },

  getUserById(request, response){
    const { id } = request.params;

    const user = users.find( (user) => user.id === Number(id) );

    if(!user){
      return response.send(400, {error : 'User not found'} )
    }
    response.send(200, user);
  },
  createUser(request, response){
    const { body } = request;

    const lastUserId = users[users.length - 1].id;

    const newUser = {
      id : lastUserId + 1,
      name : body.name,
    };

    // Joga dentro do array na memória
    users.push(newUser);

    response.writeHead(200, { 'Content-Type' : 'application/json' }); 

    response.end(JSON.stringify(newUser));
  },
  updateUser(request, response){
    let { id } = request.params;
    const { name } = request.body;

    id = Number(id);

    // Pesquisar dentro do array de usuarios se existe um usuário com esse id
    // Pesquisa o usuario que tenha o id
    const userExists = users.find((users)=> users.id === id);

    if(!userExists){
      return response.send(400, { error : 'User not found' })
    }

    // Se achar o usuário
    users = users.map((user)=>{
      // Se o user.id que stou iterando no moemnto for igual ao id que estou tentando editar
      if(user.id === id){
        return {
          ...user, //Clonar as informações do usuário atual
          name,//Vai sobreescrever o name shortsintaxe name: name
        }
      }

      // Se não for esse id ele continua o processamento normal
      return user;
    })

    response.send(200, { id : name });
  },

  deleteUser(request, response){
    let { id } = request.params;

    id = Number(id);
  }
};