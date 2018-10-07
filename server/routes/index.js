const express = require('express'),
      router = express.Router(),
      { googleAuth } = require("../middlewares/auth"),
      { register, login, update, googleSignUp } = require('../controller/users');

router
    .post('/register',register)

    .post('/login',login)

    .post('/google-signin',googleAuth, googleSignUp)

    .put('/update',update)

module.exports = router;