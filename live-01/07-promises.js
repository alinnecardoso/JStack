const apiCall = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Sucesso!');
    // reject('Erro!');
  }, 2000);
});

/* apiCall
      .then((resposta) =>{
        console.log(resposta);
      })
      .catch((erro) => {
        console.log(erro);
      }) */
async function run() {
  try {
    const resposta = apiCall;
    console.log(resposta);
  } catch (error) {
    console.log(error)
  }
}
