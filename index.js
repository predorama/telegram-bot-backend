const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();

app.use(express.json());

app.post('/send-message', async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'All fields (name, email, phone) are required' });
  }

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`,
      }
    );

    res.status(200).json({ message: 'Message sent to Telegram' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
