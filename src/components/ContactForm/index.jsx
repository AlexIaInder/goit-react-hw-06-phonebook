import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContact, addContact } from '../../redux/slice';
import { nanoid } from 'nanoid';
import './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(getContact);

  const handelChange = event => {
    const { value, name } = event.currentTarget;
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

  const handelSubmit = event => {
    event.preventDefault();
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const enterContacts = contacts.some(
      contact =>
        (contact.name === name.toLowerCase() && contact.number === number) ||
        contact.number === number
    );
    enterContacts
      ? alert(`${name} or ${number} is already in contacts`)
      : dispatch(addContact(contact));
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handelSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handelChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        placeholder="Name"
      />

      <input
        type="tel"
        name="number"
        value={number}
        onChange={handelChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        placeholder="Number"
      />

      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
