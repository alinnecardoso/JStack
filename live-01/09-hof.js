const array = [
  {name: 'Iphone', price: 5000, quantity: 2},
  {name: 'MacBook Pro', price: 20000, quantity: 1},
  {name: 'Magic Mouse', price: 1000, quantity: 5}
]

// Find and findIndex

const find = array.find((product) => product.price > 1000);
// console.log({find})

const findIndex = array.findIndex((product) => product.price > 1000);
//console.log({ findIndex})
//console.log('Produto: ', array[findIndex])

//.some
//Existe ALGUM produto maior  ou menor que 1000
const some = array.some((product) => product.price < 1000)

//.map
const map = array.map((product) => {
  return {
    ...product,
    subtotal: product.quantity * product.price
  }
})

// console.log({map})

// .reduce
const reduce = array.reduce((accumulator, product) =>{
  return accumulator + (product.quantity * product.price)
}, 0)
console.log({reduce})