import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import ContactForm from './ContactForm';
import qrCode from '../assets/images/qr.png';
import { useTranslation } from 'react-i18next';

const contactInfo = [
  {
    icon: '📍',
    titleKey: 'contact.address',
    details: 'C/Pérez Dolz, 8 . 12003 Castellón - Spain',
    link: 'https://www.google.com/maps/search/?api=1&query=C/Pérez+Dolz,+8,+12003+Castellón,+Spain',
    isLink: true
  },
  {
    icon: '📞',
    titleKey: 'contact.phone',
    details: '+34 964 041 556',
    link: 'tel:+34964041556',
    isLink: true
  },
  {
    icon: '✉️',
    titleKey: 'contact.email',
    details: 'info@tricycleproducts.es',
    link: 'mailto:info@tricycleproducts.es',
    isLink: true
  },
  {
    icon: '🕒',
    titleKey: 'contact.schedule',
    details: 'Lunes a Viernes: 9:00 - 18:00',
    isLink: false
  }
];

// Traducciones para todos los idiomas
const contactTranslations = {
  es: {
    title: "Contáctanos",
    subtitle: "Estamos aquí para ayudarte",
    form: {
      title: "Envíanos un mensaje",
      name: "Nombre",
      email: "Correo electrónico",
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
    },
    contact: {
      title: "Información de contacto",
      address: "Dirección",
      phone: "Teléfono",
      email: "Correo",
      schedule: "Horario",
      addressValue: "Calle Principal 123, Madrid, España",
      scheduleValue: "Lunes a Viernes: 9:00 - 18:00",
      followUs: "Síguenos en",
      connectWithUs: "Conéctate con nosotros",
      scanToContact: "Escanea para contactarnos directamente"
    }
  },
  en: {
    title: "Contact Us",
    subtitle: "We're here to help",
    form: {
      title: "Send us a message",
      name: "Name",
      email: "Email",
      phone: "Phone (optional)",
      message: "Message",
      submit: "Send message",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      phonePlaceholder: "+1 555 000 0000",
      messagePlaceholder: "Write your message here...",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "There was an error sending the message. Please try again."
    },
    contact: {
      title: "Contact information",
      address: "Address",
      phone: "Phone",
      email: "Email",
      schedule: "Hours",
      addressValue: "123 Main Street, Madrid, Spain",
      scheduleValue: "Monday to Friday: 9:00 - 18:00",
      followUs: "Follow us on",
      connectWithUs: "Connect with us",
      scanToContact: "Scan to contact us directly"
    }
  },
  fr: {
    title: "Contactez-nous",
    subtitle: "Nous sommes là pour vous aider",
    form: {
      title: "Envoyez-nous un message",
      name: "Nom",
      email: "Email",
      phone: "Téléphone (optionnel)",
      message: "Message",
      submit: "Envoyer le message",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "votre@email.com",
      phonePlaceholder: "+33 6 00 00 00 00",
      messagePlaceholder: "Écrivez votre message ici...",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès !",
      error: "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer."
    },
    contact: {
      title: "Informations de contact",
      address: "Adresse",
      phone: "Téléphone",
      email: "Email",
      schedule: "Horaires",
      addressValue: "123 Rue Principale, Madrid, Espagne",
      scheduleValue: "Lundi à Vendredi : 9:00 - 18:00",
      followUs: "Suivez-nous sur",
      connectWithUs: "Connectez-vous avec nous",
      scanToContact: "Scannez pour nous contacter directement"
    }
  },
  zh: {
    title: "联系我们",
    subtitle: "我们随时为您提供帮助",
    form: {
      title: "给我们发送消息",
      name: "姓名",
      email: "电子邮件",
      phone: "电话（可选）",
      message: "留言",
      submit: "发送消息",
      namePlaceholder: "您的姓名",
      emailPlaceholder: "your@email.com",
      phonePlaceholder: "+86 123 4567 8900",
      messagePlaceholder: "在此处写下您的留言...",
      sending: "发送中...",
      success: "消息发送成功！",
      error: "发送消息时出错。请重试。"
    },
    contact: {
      title: "联系方式",
      address: "地址",
      phone: "电话",
      email: "电子邮件",
      schedule: "营业时间",
      addressValue: "西班牙马德里主街123号",
      scheduleValue: "周一至周五：9:00 - 18:00",
      followUs: "关注我们的",
      connectWithUs: "与我们联系",
      scanToContact: "扫描二维码直接联系我们"
    }
  },
  tr: {
    title: "Bize Ulaşın",
    subtitle: "Yardım etmek için buradayız",
    form: {
      title: "Bize mesaj gönderin",
      name: "İsim",
      email: "E-posta",
      phone: "Telefon (isteğe bağlı)",
      message: "Mesaj",
      submit: "Mesaj gönder",
      namePlaceholder: "İsminiz",
      emailPlaceholder: "sizin@email.com",
      phonePlaceholder: "+90 500 000 00 00",
      messagePlaceholder: "Mesajınızı buraya yazın...",
      sending: "Gönderiliyor...",
      success: "Mesaj başarıyla gönderildi!",
      error: "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
    },
    contact: {
      title: "İletişim bilgileri",
      address: "Adres",
      phone: "Telefon",
      email: "E-posta",
      schedule: "Çalışma saatleri",
      addressValue: "Ana Cadde 123, Madrid, İspanya",
      scheduleValue: "Pazartesi-Cuma: 9:00 - 18:00",
      followUs: "Bizi takip edin",
      connectWithUs: "Bizimle bağlantı kurun",
      scanToContact: "Doğrudan iletişim için tarayın"
    }
  }
};

const ContactSection = () => {
  const { i18n } = useTranslation();
  const [texts, setTexts] = useState(contactTranslations.es);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Actualizar textos cuando cambie el idioma
  useEffect(() => {
    const lang = i18n.language.split('-')[0];
    setTexts(contactTranslations[lang] || contactTranslations.es);
  }, [i18n.language]);

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
    <SectionContainer>
      <SectionTitle>{texts.title}</SectionTitle>
      <ContactSubtitle>{texts.subtitle}</ContactSubtitle>
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
                <ContactTitle>{texts.contact[item.titleKey.split('.')[1]]}</ContactTitle>
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
          <ContactForm translations={texts.form} />
        </ContactFormContainer>
        <QRCodeContainer
          as={motion.div}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <QRTitle>{texts.contact.connectWithUs || "Conéctate con nosotros"}</QRTitle>
          <QRImage src={qrCode} alt="Código QR de contacto" />
          <QRText>{texts.contact.scanToContact || "Escanea para contactarnos directamente"}</QRText>
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
  padding: 100px 20px 20px;
  background-color: white;
  margin-bottom: -15px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: 80px;
    padding-bottom: 15px;
    margin-bottom: -10px;
  }
`;

const ContactSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-align: center;
  margin-bottom: 40px;
  max-width: 700px;
  line-height: 1.5;
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

const FormTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export default ContactSection; 
