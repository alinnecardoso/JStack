import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Container, Header, ListHeader, Card, InputSearchContainer, ErrorContainer, EmptyListContainer, SearchNotFoundContainer } from "./styles";

import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import { useEffect, useState, useMemo, useCallback } from "react";
import ContactsService from "../../services/ContactsService";
import APIError from "../../errors/APIError";
import sad from '../../assets/images/sad.svg'
import Button from "../../components/Button";
import emptyBox from '../../assets/images/empty-box.svg'
import magnifierQuestion from '../../assets/images/magnifier-question.svg'

export default function Home() {
  const [ contacts, setContacts ] = useState([]);
  const [ orderBy, setOrderBy ] = useState('asc');
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const [ hasError, setHasError ] = useState(false);

  const filteredContacts = useMemo(()=>contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  ), [contacts, searchTerm]);


  const loadContacts = useCallback(async() => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.ListContacts(orderBy)

      setHasError(false);
      setContacts(contactsList);

    } catch {
      setHasError(true)
    } finally{
      setIsLoading(false)
    }

  }, [orderBy])

  useEffect(() => {
    loadContacts();
  }, [loadContacts])

  function handleToggleOrderBy(){
    setOrderBy(
      (prevState) =>  (prevState === 'asc' ? 'desc' : 'asc')
    );
  }

  function handleChangeSearchTerm(event){
    setSearchTerm(event.target.value);
  }

  function handleTryAgain(){
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquise pelo nome..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
      $justifyContent={hasError
        ? 'flex-end'
        : (
          contacts.length > 0
          ? 'space-between'
          : 'center'
        )
      }
      >
        {(!hasError &&contacts.length > 0) && (
          <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        )}
        <Link to="/new">Novo Contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos</strong>
            <Button type='button' onClick={handleTryAgain} >
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>

          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="empty box" />

              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>”Novo contato”</strong> à cima para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {(contacts.length  > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier Question" />

              <span>
                Nenhum resultado foi encontrado para <strong>"{searchTerm}"</strong>
              </span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 &&(
          <ListHeader $orderBy={orderBy} > {/* A prop orderBy foi prefixada com $ para se tornar uma prop transiente. Isso significa que ela será passada apenas para o componente de estilo (styled-components) e não para o DOM. */}
          {!hasError && (
            <button type="button" onClick={handleToggleOrderBy} >
              <span>nome</span>
              <img src={arrow} alt="Arrow" />
            </button>
          )}
          </ListHeader>
        )}

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

        </>
      )}

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
