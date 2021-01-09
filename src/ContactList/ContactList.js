import React from 'react';
import { GoOrganization } from 'react-icons/go';
import { RiDeleteBin3Fill } from 'react-icons/ri';
import s from '../ContactList/ContactList.module.css';

const ContactList = ({ contacts, ondeleteContact }) => {
  return (
    <>
      <ul className={s.list}>
        {contacts.map(({ id, name, number }) => (
          <li className={s.item} key={id}>
            <GoOrganization />
            <span className={s.text}>{name}: </span>
            <span className={s.text}>{number}</span>
            <button className={s.btn} onClick={() => ondeleteContact(id)}>
              <RiDeleteBin3Fill value={{ size: 10 }} />{' '}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;
