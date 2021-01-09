import { useState } from 'react';
import PropTypes from 'prop-types';
import s from '../ContactForm/ContactForm.module.css';

export default function Phonebook({ OnSaveContacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    OnSaveContacts(name, number);
    reset();
  };

  const reset = () => {
    console.log('reset');
    setName('');
    setNumber('');
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit}>
        <label className={s.label}>
          Name
          <input
            className={s.input}
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
          ></input>
        </label>

        <label className={s.label}>
          Number
          <input
            className={s.input}
            name="number"
            type="text"
            value={number}
            onChange={handleChange}
          ></input>
        </label>

        <button className={s.btn} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
}

Phonebook.defaultProps = {
  name: '',
  number: '',
};

Phonebook.propTypes = {
  contacts: PropTypes.array,
  name: PropTypes.string,
  number: PropTypes.string,
};
