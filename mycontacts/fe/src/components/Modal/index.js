import Button from "../Button";
import { Container, Overlay, Footer } from "./styles";
import PropTypes from 'prop-types'

export default function Modal({danger}){
  return (
    <Overlay>
      <Container danger={danger} >
        <h1>Título Modal</h1>
        <p>
          Corpo do modal
        </p>

        <Footer>
          <button type="button" className="cancel-button" >Cancelar</button>

          <Button type="button" danger={danger} >
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>
  )
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false
};
