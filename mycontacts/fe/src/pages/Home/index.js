import { Container, Header, ListContainer, Card, InputSearchContainer } from "./styles";

import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'

export default function Home() {
  return (
    <Container>

      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome..." />
      </InputSearchContainer>

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

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Matheus Silva</strong>
              <small>Instagram</small>
            </div>
            <span>matheus2devacademy.com.br</span>
            <span>(41) 99999-9999</span>
          </div>

          <div className="actions">
            <a href="/">
              <img src={edit} alt="edit" />
            </a>

            <button type="button">
              <img src={trash} alt="trash" />
            </button>
          </div>
        </Card>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Matheus Silva</strong>
              <small>Instagram</small>
            </div>
            <span>matheus2devacademy.com.br</span>
            <span>(41) 99999-9999</span>
          </div>

          <div className="actions">
            <a href="/">
              <img src={edit} alt="edit" />
            </a>

            <button type="button">
              <img src={trash} alt="trash" />
            </button>
          </div>
        </Card>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Matheus Silva</strong>
              <small>Instagram</small>
            </div>
            <span>matheus2devacademy.com.br</span>
            <span>(41) 99999-9999</span>
          </div>

          <div className="actions">
            <a href="/">
              <img src={edit} alt="edit" />
            </a>

            <button type="button">
              <img src={trash} alt="trash" />
            </button>
          </div>
        </Card>

      </ListContainer>
    </Container>
  );
}
