import { Overlay } from "./styles";
import ReactDOM from 'react-dom'
import propTypes from "prop-types";

export default function Loader({ isLoading }){
  if(!isLoading) return null;
  return ReactDOM.createPortal(
    <Overlay>
      <div className="loader">

      </div>
    </Overlay>,
    document.getElementById('loader-root')
  );
};

Loader.protoTypes = {
  isLoading: propTypes.bool.isRequired,
}
