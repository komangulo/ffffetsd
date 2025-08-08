const nodemailer = require('nodemailer');
const { htmlToText } = require('html-to-text');
const pug = require('pug');
const path = require('path');
const { AppError } = require('../middleware/errorMiddleware');

// Create a transporter for sending emails
let transporter;

if (process.env.NODE_ENV === 'production') {
  // Production email configuration (using SendGrid, AWS SES, etc.)
  transporter = nodemailer.createTransport({
    service: 'SendGrid', // Or your email service provider
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD,
    },
  });
} else {
  // Development email configuration (using Mailtrap or similar)
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 2525,
    auth: {
      user: process.env.EMAIL_USERNAME || 'your_mailtrap_username',
      pass: process.env.EMAIL_PASSWORD || 'your_mailtrap_password',
    },
  });
}

// Email template renderer
const renderEmailTemplate = (template, data = {}) => {
  const templatePath = path.join(
    __dirname,
    '..',
    'views',
    'emails',
    `${template}.pug`
  );

  try {
    const html = pug.renderFile(templatePath, {
      ...data,
      appName: 'Nexus',
      appUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
    });

    return html;
  } catch (error) {
    console.error('Error rendering email template:', error);
    throw new AppError('Error rendering email template', 500);
  }
};

// Send email function
exports.sendEmail = async (options) => {
  try {
    // 1) Render HTML based on a pug template
    const html = renderEmailTemplate(options.template, options.context);

    // 2) Define email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Nexus <noreply@nexus.example.com>',
      to: options.email,
      subject: options.subject,
      html,
      text: htmlToText(html, {
        wordwrap: 130,
      }),
    };

    // 3) Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new AppError('There was an error sending the email. Try again later!', 500);
  }
};

// Email templates initialization
exports.initEmailTemplates = () => {
  // This function can be used to verify email templates on startup
  const templates = ['welcome', 'password-reset', 'verify-email'];
  
  templates.forEach((template) => {
    try {
      renderEmailTemplate(template, { name: 'Test User', verificationUrl: '#' });
    } catch (error) {
      console.error(`Failed to compile ${template} template:`, error);
      process.exit(1);
    }
  });
};
