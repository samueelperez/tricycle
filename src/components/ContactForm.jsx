import React, { useState } from 'react';
import styled from 'styled-components';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes añadir la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    // Resetear el formulario después de enviar
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    // Mostrar mensaje de éxito
    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Envíanos un mensaje</FormTitle>
      <FormField>
        <FormLabel htmlFor="name">Nombre</FormLabel>
        <FormInput 
          type="text" 
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre" 
          required 
        />
      </FormField>
      <FormField>
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormInput 
          type="email" 
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Tu email" 
          required 
        />
      </FormField>
      <FormField>
        <FormLabel htmlFor="message">Mensaje</FormLabel>
        <FormTextarea 
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Escribe tu mensaje aquí..." 
          rows={5} 
          required
        />
      </FormField>
      <SubmitButton type="submit">Enviar Mensaje</SubmitButton>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  width: 100%;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #f9f9f9;
  color: ${({ theme }) => theme.colors.darkGrey};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: white;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  background-color: #f9f9f9;
  color: ${({ theme }) => theme.colors.darkGrey};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: white;
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGreen};
    transform: translateY(-2px);
  }
`;

export default ContactForm; 