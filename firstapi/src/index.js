const http = require('http');

const { URL } = require('url');

const routes = require('./routes');

const bodyParser = require('./helpers/bodyParser')

//Criação do Servidor
const server = http.createServer((request, response) =>{ //function(request, response){}
  // parse() -> takes a URL string, parses it, and returns a URL object
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  // Listar os Usuários da Aplicação
  // Mostrar algumas informações da Request no Terminal
  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  let { pathname } = parsedUrl;
  let id = null; 

  // Filter funciona como o find, vai iterar item por item e jogar o valor no 'routeItem'
  // E depois vai converter o valor para Boolean
  // String vazia é false, quando retornar false, o filter não vai por a informação dentro do array
  const splitEndPoint = pathname.split('/').filter((Boolean)) //filter((routeItem) => Boolean(routeItem))
  
  if (splitEndPoint.length > 1){
    pathname = `/${splitEndPoint[0]}/:id`;
    id = splitEndPoint[1];
  }

  const route = routes.find((routeObj) => //Procura elemento dentro do array
    routeObj.endpoint === pathname && routeObj.method === request.method
  ); 

  if(route){
    request.query = Object.fromEntries(parsedUrl.searchParams); // Coverte um iterable para um Objeto válido no JavaScript

    request.params = { id }

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'text/html' });
      response.end(JSON.stringify(body))//Transforma o Array e Objetos em String no formato JSON
    };
    if(['POST', 'PUT', 'PATCH'].includes(request.method)){
      bodyParser(request, () =>route.handler(request, response));
    }else{
      route.handler(request, response);
    }
  }else{
    response.writeHead(404, { 'Content-Type': 'text/html' }); //O tipo de conteúdo do body é text/html
    //Como faz para enviar o html
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
  
});

// Precisa ouvir alguma porta dentro da máquina para o servidor subir
server.listen(3000, () => console.log('Server started at http//localhost:3000'));