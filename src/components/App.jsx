import ContactForm from "./ContactForm/ContactForm"
import ContactList from "./ContactList/ContactList"
import Filter from "./Filter/Filter"
import Notification from "./Notification/Notification"
import { Header } from "./App.styled"
import { useEffect, useState } from "react"

const App = () => {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contacts')) ?? [])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

  const addContact = (newContact) => {
    const isExist = contacts.find(({name}) => name.toLowerCase() === newContact.name.toLowerCase());
    if (isExist) {
      return alert(`${newContact.name} is already exist`);
    }

    setContacts((prev) => [...prev, newContact]);
  }
  
  const handleChangeFilter = (e) => {
    setFilter(e.target.value.toLowerCase());
  }

  const filteredList = () => {
    return contacts.filter(({name}) => name.toLowerCase().includes(filter));
  }

  const handleDelete = (id) => {
    setContacts((prev) => prev.filter(contact => contact.id !== id));
  }

  return (
    <>
      <Header>Phonebook</Header>
      <ContactForm addContact={addContact} />
      <Header>Contacts</Header>
      <Filter handleChangeFilter={handleChangeFilter} filter={filter} />
      {contacts.length ?
        <ContactList contacts={filteredList()} handleDelete={handleDelete} /> :
        <Notification message={'There are no contacts'} />
      }
    </>
  )
}

export default App
