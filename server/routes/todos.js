const express = require("express"),
  router = express.Router(),
  { create, show, update, remove, complete } = require("../controller/todos");

router
  .get("/list", show)

  .post("/list", create)

  .put("/list", complete)

  .put("/:id", update)

  .delete("/:id", remove);

module.exports = router;
