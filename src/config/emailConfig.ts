// EmailJS Configuration
// TODO: Replace with your own EmailJS credentials
// Sign up at https://www.emailjs.com/

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_lapinoumath', // Replace with your service ID
  TEMPLATE_ID: 'template_error_report', // Replace with your template ID
  PUBLIC_KEY: 'your_public_key_here', // Replace with your public key
};

// Initialize EmailJS when needed
export const initEmailJS = () => {
  // EmailJS will be initialized when first report is sent
};

// For now, we'll just log errors locally
// You can add real email sending by configuring EmailJS credentials
