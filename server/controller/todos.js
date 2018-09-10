require('dotenv').config();

const Todo = require('../models/todos'),
      request = require('request'),
      accessToken = process.env.GoogleCalAPI;

module.exports = {
    echo: (req, res) => {
        console.log ('connected to index')
    },
    
    create: (req, res) => {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            endDate: req.body.endDate,
            status: req.body.status
        })
        .then(todo => {
            res.status(201).json({
                message: `Success add task : ${req.body.title}`,
                todo: todo
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
        Todo.find()
        .then(todo => {
            res.status(200).json({
                todo: todo
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    },

    findById: (req, res) => {
        console.log(req.body)
        Todo.findOne({
            title: req.body.title
        })
        .then(todo => {
            res.status(200).json({
                todo: todo
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    },

    update: (req, res) => {
        Todo.updateOne({
            title: req.body.title,
            description: req.body.description,
            endDate: req.body.endDate,
            status: req.body.status
        }, {
            where : {
                id: req.params.id
            }
        })
        .then(todo => {
            res.status(200).json({
                message: 'Success update task',
                upData: todo
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    },

    remove: (req, res) => {
        Todo.deleteOne({
            where : {
                id: req.params.id
            }
        })
        .then(() => {
            res.status(200).json({
                message: 'Delete task success'
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    }

}