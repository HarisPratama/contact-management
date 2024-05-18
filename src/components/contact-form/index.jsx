// src/ContactForm.js
import './style.css';

import React, { useEffect, useState } from 'react';


const ContactForm = ({ onSubmit, onClose, contact, onSubmitUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    photo: '',
  });
  
  useEffect(() => {
    if (contact.id) {
      setFormData(contact)
    }
  }, [contact])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.id) {
      onSubmitUpdate(formData)
    } else {
      onSubmit(formData);
    }
    onClose();
  };

  return (
    <div className='form'>
      <h1>{contact.id ? 'Update' : 'Add'} Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-form'>
          <label>
            First Name:
            <br/>
            <input
              className='input-field'
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='input-form'>
          <label>
            Last Name:
            <br/>
            <input
              className='input-field'
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='input-form'>
          <label>
            Age:
            <br/>
            <input
              className='input-field'
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='input-form'>
          <label>
            Photo URL:
            <br/>
            <input
              className='input-field'
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
            />
          </label>
        </div>
        <button className='btn-submit' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
