const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.locals.users = allUsers;
    res.render("users/index.ejs");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.userId);
    if (!foundUser) {
      return res.redirect("/users");
    }

    res.locals.profileUser = foundUser;
    res.render("users/show.ejs");
  } catch (err) {
    console.log(err);
    res.redirect("/users");
  }
});

module.exports = router;
