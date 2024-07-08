const users = require('../mocks/users');

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

    response.writeHead(200, { 'Content-Type' : 'application/json' }); //O tipo de conteúdo do body é application/json
    //Como faz para enviar o html
    response.end(JSON.stringify(sortedUsers)); //Transforma o Array e Objetos em String no formato JSON
  },

  getUserById(request, response){
    const { id } = request.params;

    const user = users.find( (user) => user.id === Number(id) );

    if(!user){
      response.writeHead(400, { 'Content-Type' : 'application/json' }); 

      response.end(JSON.stringify({error : 'User not found'}));
    }else{
      response.writeHead(200, { 'Content-Type' : 'application/json' }); 

      response.end(JSON.stringify(user));
    }
  },
  createUser(request, response){
    let body =  '';

    // Esse eventListener escuta toda vez que a msg chega e junta todas as strings e depois faz um parse para JSON
    // Quando chegar a informação, recebe a informação na variavel chunck
    request.on('data', (chunk) =>{
      body += chunk; //Isso é uma string
    });

    // Existe um outro eventListener que indica quando acabou
    // Ou seja, quando chegar o último pedaço da mensagem
    request.on('end', () => {
      body = JSON.parse(body); //Tem que converter a string para JSON

      const lastUserId = users[users.length - 1].id;

      const newUser = {
        id : lastUserId + 1,
        name : body.name,
      };

      // Joga dentro do array na memória
      users.push(newUser);

      response.writeHead(200, { 'Content-Type' : 'application/json' }); 

      response.end(JSON.stringify(newUser));
    });
  }
};