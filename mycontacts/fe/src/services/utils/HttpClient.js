import delay from "../../utils/delay";

class HttpClient{
  constructor(baseURL){
    this.baseURL = baseURL;
  }
  async get(path){
    await delay(500);

    console.log('Antes response')

    const response = await fetch(`${this.baseURL}${path}`)

    console.log('Depois response')

    const body = await response.json();


    if(response.ok){
      return body;
    }

    console.log('Depois body: ' + body.error)
    throw new Error(body.error);

  }
}

export default HttpClient;
