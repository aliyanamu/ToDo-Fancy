const express = require('express'),
      router = express.Router(),
      { register, login, update } = require('../controller/users');

router
    .post('/register',register)

    .post('/login',login)

    .post('/update',update)

module.exports = router;