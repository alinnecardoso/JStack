import { useState } from 'react';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { Form, ButtonContainer } from './styles';
import PropTypes from 'prop-types'
import isEmailValid from '../../utils/isEmailValid';
import useErrors, { useError } from '../../hooks/useErrors'

export default function ContactForm({ buttonLabel }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const { setError, removeError, getErrorMessageByFieldName } = useErrors();

  function handleNameChange(event){
    setName(event.target.value);

    if(!event.target.value){
      setError({ field: 'name', message: 'Nome é obrigatório.'})
    }else{
      removeError('name');
    }
  }

  function handleEmailChange(event){
    setEmail(event.target.value);

    if(event.target.value && !isEmailValid(event.target.value)){
      setError({ field: 'email', message: 'Email inválido.'})
    }else{
      removeError('email')
    }
  }


  function handleSubmit(event){
    event.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit} >
      <FormGroup error={getErrorMessageByFieldName('name')} >
        <Input
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')} >
        <Input
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={(event)=> setPhone(event.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category}
          onChange={(event)=> setCategory(event.target.value)}
        >
          <option value="">Categoria</option>
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" onClick={handleSubmit} >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  )
}

ContactForm.propType = {
  buttonLabel: PropTypes.string.isRequired,
}
