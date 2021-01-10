import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import s from "../ContactForm/ContactForm.module.css";

export default function Phonebook({ OnSaveContacts }) {
  const { register, handleSubmit, errors } = useForm();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const reset = () => {
    setName("");
    setNumber("");
  };

  const onSubmit = (data) => {
    console.log(data);
    OnSaveContacts(name, number);
    reset();
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;

      case "number":
        setNumber(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={s.label}>
          Name
          <input
            className={s.input}
            autoComplete="off"
            name="name"
            type="text"
            value={name}
            ref={register({ required: true, minLength: 3 })}
            onChange={handleChange}
          />
        </label>
        {errors.name && errors.name.type === "required" && (
          <p className={s.textError}>This is required </p>
        )}

        {errors.name && errors.name.type === "minLength" && (
          <p className={s.textError}>
            This is field is required min length of 3
          </p>
        )}

        <label className={s.label}>
          Number
          <input
            className={s.input}
            autoComplete="off"
            name="number"
            type="text"
            value={number}
            ref={register({
              required: true,
              minLength: 7,
              pattern: /^[0-9]+$/gm,
            })}
            onChange={handleChange}
          />
        </label>
        {errors.number && errors.number.type === "minLength" && (
          <p className={s.textError}>Number too short</p>
        )}

        {errors.number && errors.number.type === "required" && (
          <p className={s.textError}>This is required </p>
        )}

        {errors.number && errors.number.type === "pattern" && (
          <p className={s.textError}>There must be numbers</p>
        )}

        <button className={s.btn} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
}

Phonebook.defaultProps = {
  name: "",
  number: "",
};

Phonebook.propTypes = {
  contacts: PropTypes.array,
  name: PropTypes.string,
  number: PropTypes.string,
};
