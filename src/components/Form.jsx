import React, { useState } from 'react';

function Form({ title, fields, onSubmit, buttonText, buttonClass }) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event, formData);
    closeModal(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      {title && <h2>{title}</h2>}
      {fields?.map(({ name, type, label }, index) => {
        return (
          <div className="inputContainer" key={index}>
            <input
              type={type}
              placeholder={label}
              id={name}
              className={'inputBox'}
              name={name}
              value={formData[name] || ''} 
              onChange={handleInputChange}
            />
            <br /><br />
          </div>
        );
      })}
      <button type="submit" className={buttonClass}>{buttonText}</button>
    </form>
  );
}

export default Form;