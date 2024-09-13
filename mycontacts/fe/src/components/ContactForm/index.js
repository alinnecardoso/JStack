import { useState } from "react";
import Button from "../Button";
import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import { Form, ButtonContainer } from "./styles";
import PropTypes from 'prop-types'

export default function ContactForm({ buttonLabel }){
  const [name, setName] = useState('')
  return (
    <Form>
      <FormGroup>
        <Input
          value={name}
          placeholder="Nome"
          onChange={(event)=> setName(event.target.value)}
        />
      </FormGroup>

      <FormGroup
        error="O formato do e-mail é invalido"
      >
        <Input placeholder="E-mail" error />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Telefone" />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="instagram">Instagram</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  )
}

ContactForm.propType = {
  buttonLabel: PropTypes.string.isRequired,
}
