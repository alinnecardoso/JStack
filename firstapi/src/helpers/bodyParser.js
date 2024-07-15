function bodyParser(request, callback){
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
    request.body = body;
    callback();
  });
}

module.exports = bodyParser;