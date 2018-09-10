const express = require('express'),
      router = express.Router(),
      { create, show, update } = require('../controller/todos');

router
    .post('/register',create)
    .post('/login',show)
    .post('/update',update)

module.exports = router;