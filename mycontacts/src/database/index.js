const { Client } = require('pg')

const client = new Client(
  {
    host: 'localhost',
    port: 5432,
    user: 'root',
    password: 'root',
    database: 'mycontacts',
  }
);

client.connect();

exports.query = async (query) =>{
  const { rows } = await client.query('SELECT * FROM contacts');
  return rows;
}

Query('SELECT * FROM contacts').then(console.log);
