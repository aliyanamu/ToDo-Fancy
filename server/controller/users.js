require('dotenv').config()
let hashPass = require("../helpers/hashPass")

const User = require('../models/users'),
      jwt = require('jsonwebtoken')

module.exports = {
    echo: (req, res) => {
        console.log ('connected to index')
    },
    
    register: (req, res) => {
        console.log('masuk controllers/users -> login')
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            User.findOne({
                email: req.body.email,
                password: hashPass(req.body.password)
              })
            .then(user => {
                jwt.sign({
                id: user._id
                }, process.env.ACCESS_KEY,
                function (err, token) {
                    res.status(200).json({
                    name: user.name,
                    token: token
                    })
                }
                )
            })
            .catch(err => {
                res.status(500).json({
                message: `email and password didn't match`
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    },

    login: (req, res) => {
        console.log('masuk controllers/users -> login')
        let user = req.user
        User.findOne({
          email: req.body.email,
          password: hashPass(req.body.password)
        })
        .then(user => {
            jwt.sign({
                id: user._id
            }, process.env.ACCESS_KEY,
                function (err, token) {
                res.status(200).json({
                    name: user.name,
                    token: token
                })
                }
            )
        })
        .catch(err => {
            res.status(500).json({
                message: `wrong email or password`
            })
        })
    },

    googleSignUp: (req, res) => {
        User.findOne({
          email: req.body.email
        })
          .then(data => {
            if (!data) {
              User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
              })
                .then(user => {
                  jwt.sign({
                    id: user._id
                  }, process.env.ACCESS_KEY,
                    function (err, token) {
                      res.status(200).json({
                        name: user.name,
                        token: token
                      })
                  })
                })
                .catch(err => {
                  res.status(500).json({
                    message: err.message
                  })
                })
            } else {
              jwt.sign({
                id: data._id
              }, process.env.ACCESS_KEY,
                function (err, token) {
                  res.status(200).json({
                    name: data.name,
                    token: token
                  })
                }
              )
            }
          })
      },

    update: (req, res) => {
        User.updateOne({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, {
            where : {
                id: req.params.id
            }
        })
        .then(user => {
            res.status(200).json({
                message: 'Update data success',
                upData: user
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    }
}