import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Container, Header, ListHeader, Card, InputSearchContainer } from "./styles";

import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";

export default function Home() {
  const [ contacts, setContact ] = useState([])
  const [ orderBy, setOrderBy ] = useState('asc')
  const [ searchTerm, setSearchTerm ] = useState('')

  useEffect(() => {
    fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
    .then( async (response) => {
      const json = await response.json();
      setContact(json);
      // response.headers.forEach((header) => console.log(header))
    })
    .catch((error) => {
      console.error('error', error)
      })
  }, [orderBy])

  function handleToggleOrderBy(){
    setOrderBy(
      (prevState) =>  (prevState === 'asc' ? 'desc' : 'asc')
    );
  }

  function handleChangeSearchTerm(event){
    setSearchTerm(event.target.value);
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Container>

      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Pesquise pelo nome..."
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

      <ListHeader $orderBy={orderBy} > {/* A prop orderBy foi prefixada com $ para se tornar uma prop transiente. Isso significa que ela será passada apenas para o componente de estilo (styled-components) e não para o DOM. */}
          <button type="button" onClick={handleToggleOrderBy} >
            <span>nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
      </ListHeader>

      {filteredContacts.map((contact)=>(
        <Card key={contact.id} >
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>

              {contact.category_name && (
                <small>{contact.category_name}</small>
              )}

            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="edit" />
            </Link>

            <button type="button">
              <img src={trash} alt="trash" />
            </button>
          </div>
        </Card>
      ))}


    </Container>
  );
}


// SOP  -> Same Origin Policy -> Política de mesma origem
// CORS -> Cross-Origin Resource Sharing -> Compartilhamento de recursos entre origens cruzadas/diferente
// Origem: protocolo://dominio:porta

// Saída:   http://localhost:3000
// Entrada: http://localhost:3001


// Toda vez que fere a politica de mesma origem (SOP), essa request é automaticamente passa a ser uma request do tipo CORS

// Preflight -> Pré-Voô -> Requisação que acontece antes da requisição 'DELETE' (Exemplo) -> Método http dessa requisição preflight é OPTIONS -> Serve para verificar com o Backend quais são os métodos http e os headers que ele está permitindo serem executados
