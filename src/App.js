import { useState, useEffect } from 'react';
import { v1 as uuidv1 } from 'uuid';
import s from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import PropTypes from 'prop-types';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? defaultContacts,
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (name, number) => {
    const myContacts = {
      id: uuidv1(),
      name,
      number,
    };

    //проверяем дублируется контакт или нет при добавлении
    const getContacts = contacts.map(contact =>
      contact.name.toLocaleLowerCase(),
    );

    console.log(getContacts);

    const isGetContactAlready = getContacts.includes(name.toLocaleLowerCase());

    if (isGetContactAlready) {
      alert(`${name} is already in contacts!`);
    } else {
      setContacts(prevState => [...prevState, myContacts]);
    }
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContactsByName = () => {
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    );
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm OnSaveContacts={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter value={filter} OnFilterContacts={handleChangeFilter} />
      <ContactList
        contacts={filterContactsByName()}
        ondeleteContact={deleteContact}
      />
    </div>
  );
}

App.defaultProps = {
  contacts: [],
  name: '',
  number: '',
};

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
};
