import { Children } from "react";
import Input from "../Input";
import { Container } from "./styles";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import Loader from "../Loader";

export default function FormGroup({ children, error, isLoading }){
  return (
    <Container>
      <div className="form-item">
        {children}

        {isLoading && (
          <div className="loader">
            <Spinner size={16} />
          </div>
        )}
      </div>
      {/* Se houver um valor dentro do error então renderize a tag <small> que vai mostrar em tela exatamente o valor desse erro */}
      {error && <small>{error}</small>}
    </Container>
  )
}

FormGroup.protoType = {
  Children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

FormGroup.defaultProps = {
  error: null,
  isLoading: false,
};
