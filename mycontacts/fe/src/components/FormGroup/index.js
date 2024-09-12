import { Children } from "react";
import Input from "../Input";
import { Container } from "./styles";
import PropTypes from "prop-types";

export default function FormGroup({ children }){
  return (
    <Container>
      {children}
    </Container>
  )
}

FormGroup.prototype = {
  Children: PropTypes.node.isRequired,
}
