// Configuración de EmailJS
// Estos valores se deben reemplazar con las credenciales reales de tu cuenta de EmailJS
// Crea una cuenta en https://www.emailjs.com/ si aún no tienes una

export const EMAILJS_CONFIG = {
  // ID del servicio SMTP configurado en EmailJS
  SERVICE_ID: 'service_fqqz02j',
  
  // ID de la plantilla de correo
  TEMPLATE_ID: 'template_26391bx',
  
  // Clave pública de EmailJS
  PUBLIC_KEY: '6KRN44MDKcSxK7rOL'
};

// Instrucciones para configurar EmailJS:
// 1. Regístrate en https://www.emailjs.com/
// 2. Crea un servicio de correo (Gmail, Outlook, etc.)
// 3. Crea una plantilla de correo con las siguientes variables:
//    - {{name}}: Nombre del remitente
//    - {{email}}: Correo del remitente
//    - {{phone}}: Teléfono del remitente
//    - {{message}}: Mensaje del formulario
// 4. Obtén tu clave pública de la sección "Account" > "API Keys"
// 5. Reemplaza los valores en este archivo con tus credenciales 