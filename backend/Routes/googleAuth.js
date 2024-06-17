const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();
const client = new OAuth2Client('998791037081-3or9rnoc64ngc80940nidqup68almopi.apps.googleusercontent.com');

router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '998791037081-3or9rnoc64ngc80940nidqup68almopi.apps.googleusercontent.com'
    });
    const { name, email, picture } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, password: '', location: '' });
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ success: true, token: jwtToken, user: { name, email, picture } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Google login failed' });
  }
});

module.exports = router;
