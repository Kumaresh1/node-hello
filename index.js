const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
const allowedOrigins = [
  'https://petindiaindustries.com', // Add more origins if needed
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST'], // Allow only POST requests
};

app.use(cors(corsOptions));

const fromEmail = 'mailreceivedtoday@gmail.com';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: fromEmail,
    pass: 'dnjh wauk knhd dnmh',
  },
});

app.post('/send-email', (req, res) => {
  const { name, email, subject, phone, message } = req.body;

  const mailOptions = {
    from: fromEmail,
    to: 'kumaresh12012@gmail.com',
    // to: 'petindiaindustries.com',
    subject: subject || 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`, // Plain text body
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Message: ${message}</p>`, // HTML body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res
        .status(500)
        .send({ success: false, message: 'Failed to send email', error });
    }
    res.send({ success: true, message: 'Email sent successfully', info });
  });

  // mailOptions.to = 'petindiaindustries.com';
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return res
  //       .status(500)
  //       .send({ success: false, message: 'Failed to send email', error });
  //   }
  //   res.send({ success: true, message: 'Email sent successfully', info });
  // });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
