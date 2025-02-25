import ToastContainer from "../ToastContainer";
import { Container } from "./style";
import PropTypes from "prop-types";

import xCircleIcon from '../../../assets/images/icons/x-circle.svg'
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg'

export default function ToastMessage({ text, type, onRemoveMessage }){
  function handleRemoveToast(){
    onRemoveMessage('message-id')
  }
  return (
    <Container type={type} onClick={handleRemoveToast} >
      { type === 'danger' && <img src={xCircleIcon} alt="X" /> }
      { type === 'success' && <img src={checkCircleIcon} alt="Check" /> }
      <strong>{ text }</strong>
    </Container>
  )
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf([ 'default', 'success', 'danger' ]),
  onRemoveMessage: PropTypes.func.isRequired
}

ToastMessage.defaultTypes = {
  type: 'default'
}
