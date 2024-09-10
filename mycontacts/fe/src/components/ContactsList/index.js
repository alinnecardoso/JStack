import { Container, Header,ListContainer } from "./styles";

import arrow from '../../assets/images/icons/arrow.svg'

export default function ContactsList() {
  return (
    <Container>
      <Header>
        <strong>3 Contatos</strong>
        <a href="/">Novo Contato</a>
      </Header>

      <ListContainer>
        <header>
          <button type="button" >
            <span>nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>
      </ListContainer>
    </Container>
  );
}
