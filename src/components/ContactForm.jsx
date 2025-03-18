import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ContactForm = ({ translations }) => {
  const { i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  // Usar traducciones del prop o valores predeterminados si no están disponibles
  const t = translations || {
    title: "Envíanos un mensaje",
    name: "Nombre",
    email: "Email",
    phone: "Teléfono (opcional)",
    message: "Mensaje",
    submit: "Enviar mensaje",
    namePlaceholder: "Tu nombre",
    emailPlaceholder: "tucorreo@ejemplo.com",
    phonePlaceholder: "+34 600 000 000",
    messagePlaceholder: "Escribe tu mensaje aquí...",
    sending: "Enviando...",
    success: "¡Mensaje enviado con éxito!",
    error: "Hubo un error al enviar el mensaje. Por favor, intenta de nuevo."
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Simulación de envío de formulario
    try {
      // Aquí iría la lógica real de envío de formulario
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>{t.title}</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="name">{t.name}</FormLabel>
          <FormInput
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t.namePlaceholder}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="email">{t.email}</FormLabel>
          <FormInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.emailPlaceholder}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="phone">{t.phone}</FormLabel>
          <FormInput
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t.phonePlaceholder}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="message">{t.message}</FormLabel>
          <FormTextarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t.messagePlaceholder}
            rows="6"
            required
          />
        </FormGroup>
        <SubmitButton
          type="submit"
          disabled={isSubmitting}
          as={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? t.sending : t.submit}
        </SubmitButton>
        {submitStatus === 'success' && (
          <StatusMessage success>
            {t.success}
          </StatusMessage>
        )}
        {submitStatus === 'error' && (
          <StatusMessage>
            {t.error}
          </StatusMessage>
        )}
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 100%;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const FormInput = styled.input`
  padding: 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background-color: white;
  color: ${({ theme }) => theme.colors.darkGrey};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(46, 139, 87, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  padding: 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease;
  background-color: white;
  color: ${({ theme }) => theme.colors.darkGrey};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(46, 139, 87, 0.1);
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  align-self: flex-start;
  margin-top: 10px;
  
  &:hover {
    background-color: #246e45;
  }
  
  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.p`
  margin-top: 15px;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.95rem;
  background-color: ${props => props.success ? 'rgba(46, 139, 87, 0.1)' : 'rgba(229, 62, 62, 0.1)'};
  color: ${props => props.success ? '#246e45' : '#c53030'};
`;

export default ContactForm; 