import { useState, useEffect } from 'react';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { Form, ButtonContainer } from './styles';
import PropTypes from 'prop-types'
import isEmailValid from '../../utils/isEmailValid';
import useErrors, { useError } from '../../hooks/useErrors'
import formatPhone from '../../utils/formatPhone';
import CategoriesService from '../../services/CategoriesService';

export default function ContactForm({ buttonLabel }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [ categories, setCategories ] = useState([]);
  const [ isLoadingCategories, setIsLoadingCategories ] = useState(true);

  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    async function loadCategories(){
     try {
      const categoriesList = await CategoriesService.ListCategories();
      console.log(categoriesList)

      setCategories(categoriesList);
     } catch {} finally{
      setIsLoadingCategories(false);
     }
    }

    loadCategories();
  }, [])

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

  function handlePhoneChange(event){
    setPhone(formatPhone(event.target.value))
  }


  function handleSubmit(event){
    event.preventDefault();

    console.log({
      name, email, phone: phone.replace(/\D/g, ''), categoryId
    })
  }



  return (
    <Form onSubmit={handleSubmit} noValidate >
      <FormGroup error={getErrorMessageByFieldName('name')} >
        <Input
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
          $error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')} >
        <Input
          type='email'
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          $error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event)=> setCategoryId(event.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="">Categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" onClick={handleSubmit} disabled={!isFormValid} >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  )
}

ContactForm.propType = {
  buttonLabel: PropTypes.string.isRequired,
}
