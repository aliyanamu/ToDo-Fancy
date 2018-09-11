const Todo = require("../models/todos");

module.exports = {
  echo: (req, res) => {
    console.log("connected to index");
  },

  create: (req, res) => {
    console.log("masuk dulu", req.body);
    let todo = new Todo({
      title: req.body.title,
      description: req.body.desc,
      endDate: req.body.date,
      status: JSON.parse(req.body.isCompleted)
    });

    todo.save(err => {
      if (!err) {
        res.status(201).json({
          message: `Success add task : ${req.body.title}`,
          todo: todo
        });
      } else {
        res.status(500).json({
          message: err.message
        });
      }
    });
  },

  show: (req, res) => {
    Todo.find()
      .then(todo => {
        res.status(200).json({
          todo: todo
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });
      });
  },

  complete: (req, res) => {
    console.log(JSON.parse(req.body.isCompleted));
    Todo.findOneAndUpdate(
      {
        title: req.body.title
      },
      {
        $set: {
          status: JSON.parse(req.body.isCompleted)
        }
      }
    )
      .then(todo => {
        console.log(todo);
        res.status(200).json({
          todo: todo
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });
      });
  },

  update: (req, res) => {
    Todo.updateOne(
      {
        title: req.body.title,
        description: req.body.description,
        endDate: req.body.endDate,
        status: req.body.status
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(todo => {
        res.status(200).json({
          message: "Success update task",
          upData: todo
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });
      });
  },

  remove: (req, res) => {
    Todo.deleteOne({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.status(200).json({
          message: "Delete task success"
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });
      });
  }
};
