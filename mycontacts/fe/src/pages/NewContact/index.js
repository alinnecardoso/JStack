import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";

export default function NewContact() {
  function handleSubmit(){

  }
  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactForm
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  )
}
