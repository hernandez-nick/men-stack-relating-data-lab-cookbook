const express = require("express");
const router = express.Router();

const User = require("../models/user.js");




// Show	‘/users/:userId/foods/:itemId’	GET
// Edit	‘/users/:userId/foods/:itemId/edit’	GET
// Update	‘/users/:userId/foods/:itemId’	PUT
// Delete	‘/users/:userId/foods/:itemId’	DELETE



// Index	‘/users/:userId/foods’	GET
router.get("/", (req, res) => {
    User.findById(req.session.user._id, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.locals.pantry = foundUser.pantry;
            res.render("foods/index.ejs");
        }
    });
});

// New	‘/users/:userId/foods/new’	GET
router.get("/new", (req, res) => {
    res.render("foods/new.ejs");
});

// Create	‘/users/:userId/foods’	POST
router.post("/", (req, res) => {
    User.findById(req.session.user._id, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            foundUser.pantry.push(req.body);
            foundUser.save((err, savedUser) => {
                if (err) {
                    console.log(err);
                    res.redirect("/");
                } else {
                    res.redirect("/users/" + req.session.user._id + "/foods");
                }
            });
        }
    });
});




module.exports = router;
