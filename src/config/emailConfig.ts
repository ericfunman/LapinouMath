/* istanbul ignore file */
import emailjs from '@emailjs/browser';

// EmailJS Configuration
// Get these from your EmailJS account at https://dashboard.emailjs.com/

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_305dfu9',
  TEMPLATE_ID: 'template_xphq7n2',
  PUBLIC_KEY: 'ShHyWcGX4s7YtH8lH',
};

// Initialize EmailJS
export const initEmailJS = () => {
  try {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('✅ EmailJS initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize EmailJS:', error);
  }
};

// Call init immediately when module loads
initEmailJS();
