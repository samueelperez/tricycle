import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import ContactForm from './ContactForm';
import qrCode from '../assets/images/qr.png';

const contactInfo = [
  {
    icon: '📍',
    title: 'Dirección',
    details: 'C/Pérez Dolz, 8 . 12003 Castellón - Spain',
    link: 'https://www.google.com/maps/search/?api=1&query=C/Pérez+Dolz,+8,+12003+Castellón,+Spain',
    isLink: true
  },
  {
    icon: '📞',
    title: 'Teléfono',
    details: '+34 964 041 556',
    link: 'tel:+34964041556',
    isLink: true
  },
  {
    icon: '✉️',
    title: 'Email',
    details: 'info@tricycleproducts.es',
    link: 'mailto:info@tricycleproducts.es',
    isLink: true
  },
  {
    icon: '🕒',
    title: 'Horario',
    details: 'Lunes a Viernes: 9:00 - 18:00',
    isLink: false
  }
];

const ContactSection = () => {
  return (
    <SectionContainer>
      <SectionTitle>Contacto</SectionTitle>
      <ContactContent>
        <ContactInfoContainer>
          {contactInfo.map((item, index) => (
            <ContactInfoItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ContactIcon>{item.icon}</ContactIcon>
              <ContactDetails>
                <ContactTitle>{item.title}</ContactTitle>
                {item.isLink ? (
                  <ContactLink href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.details}
                  </ContactLink>
                ) : (
                  <ContactText>{item.details}</ContactText>
                )}
              </ContactDetails>
            </ContactInfoItem>
          ))}
        </ContactInfoContainer>
        <ContactFormContainer>
          <ContactForm />
        </ContactFormContainer>
        <QRCodeContainer
          as={motion.div}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <QRTitle>Conéctate con nosotros</QRTitle>
          <QRImage src={qrCode} alt="Código QR de contacto" />
          <QRText>Escanea para contactarnos directamente</QRText>
        </QRCodeContainer>
      </ContactContent>
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f9f9f9;
`;

const ContactContent = styled.div`
  display: flex;
  max-width: 1300px;
  width: 100%;
  gap: 25px;
  
  @media (max-width: 1200px) {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    flex-direction: column;
    align-items: center;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 30px;
  }
`;

const ContactInfoContainer = styled.div`
  flex: 0.7;
  background-color: white;
  color: ${({ theme }) => theme.colors.darkGrey};
  padding: 30px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px;
  }
`;

const ContactInfoItem = styled(motion.div)`
  margin-bottom: 30px;
  display: flex;
  align-items: flex-start;
`;

const ContactIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 15px;
  color: ${({ theme }) => theme.colors.primary};
  background-color: rgba(46, 139, 87, 0.1);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const ContactText = styled.span`
  color: ${({ theme }) => theme.colors.darkGrey};
  font-size: 1rem;
`;

const ContactFormContainer = styled.div`
  flex: 1;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px;
  }
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.darkGrey};
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

const QRCodeContainer = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  
  @media (max-width: 1200px) {
    flex: 0 0 calc(50% - 15px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 100%;
    padding: 25px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px;
  }
`;

const QRTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const QRImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 150px;
    height: 150px;
  }
`;

const QRText = styled.p`
  color: ${({ theme }) => theme.colors.darkGrey};
  font-size: 0.95rem;
  text-align: center;
  line-height: 1.4;
`;

export default ContactSection; 
