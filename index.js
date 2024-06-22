const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://127.0.0.1:5500', // Replace with your allowed domain
    methods: ['POST'], // Allow only POST requests
  }),
);

const fromEmail = 'alerts.toeatz@gmail.com';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: fromEmail,
    pass: 'nyqj aknn ggcg hpnw',
  },
});

// API endpoint to send email
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: fromEmail,
    to: 'kumaresh12012@gmail.com',
    subject: 'New Contact Form Submission',
    // text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res
        .status(500)
        .send({ success: false, message: 'Failed to send email', error });
    }
    res.send({ success: true, message: 'Email sent successfully', info });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
