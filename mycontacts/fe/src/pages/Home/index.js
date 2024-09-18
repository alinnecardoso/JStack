import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Container, Header, ListContainer, Card, InputSearchContainer } from "./styles";

import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";

export default function Home() {
  const [contacts, setContact] = useState([])
  useEffect(() => {
    fetch("http://localhost:3001/contacts")
    .then( async (response) => {
      const json = await response.json();
      setContact(json);
      // response.headers.forEach((header) => console.log(header))
    })
    .catch((error) => {
      console.error('error', error)
      })
  }, [])

  console.log(contacts);
  return (
    <Container>

      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome..." />
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button" >
            <span>nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        {contacts.map((contact)=>(
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

      </ListContainer>
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
