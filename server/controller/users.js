require('dotenv').config();

const User = require('../models/users'),
      request = require('request'),
      accessToken = process.env.GoogleCal;

module.exports = {
    echo: (req, res) => {
        console.log ('connected to index')
    },
    
    create: (req, res) => {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        })
        .then(user => {
            res.status(201).json({
                message: `Success create user ${req.body.name}`,
                user: user
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    },

    show: (req, res) => {
        console.log(req.body)
        User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            res.status(200).json({
                user: user
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    },

    update: (req, res) => {
        User.updateOne({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
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
    },

    remove: (req, res) => {
        User.deleteOne({
            where : {
                id: req.params.id
            }
        })
        .then(() => {
            res.status(200).json({
                message: 'Delete data success'
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    }

}