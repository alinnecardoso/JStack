import { Children } from "react";
import Input from "../Input";
import { Container } from "./styles";
import PropTypes from "prop-types";

export default function FormGroup({ children, error }){
  return (
    <Container>
      {children}
      {/* Se houver um valor dentro do error então renderize a tag <small> que vai mostrar em tela exatamente o valor desse erro */}
      {error && <small>{error}</small>}
    </Container>
  )
}

FormGroup.prototype = {
  Children: PropTypes.node.isRequired,
  error: PropTypes.string,
};

FormGroup.defaultProps = {
  eror: null,
};
