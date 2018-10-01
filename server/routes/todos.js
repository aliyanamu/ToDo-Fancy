const express = require("express"),
  router = express.Router(),
  { isLogin } = require("../middlewares/auth"),
  { create, show, update, remove, complete } = require("../controller/todos");

router
  .get("/list", isLogin, show)

  .post("/list", isLogin, create)

  .put("/list", isLogin, complete)

  .put("/:docktitle", isLogin, update)

  .delete("/:docktitle", isLogin, remove);

module.exports = router;
