import { Overlay } from "./styles";
import ReactDOM from 'react-dom'
import propTypes from "prop-types";
import Spinner from "../Spinner";

export default function Loader({ isLoading }){
  if(!isLoading) return null;
  return ReactDOM.createPortal(
    <Overlay>
      <Spinner size={90} />
    </Overlay>,
    document.getElementById('loader-root')
  );
};

Loader.protoTypes = {
  isLoading: propTypes.bool.isRequired,
}
