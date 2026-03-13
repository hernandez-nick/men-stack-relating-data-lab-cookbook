const express = require("express");
const router = express.Router();

const User = require("../models/user.js");



// Index	‘/users/:userId/foods’	GET
router.get("/", async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user._id);
        res.locals.pantry = foundUser.pantry;
        res.render("foods/index.ejs");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});


// New	‘/users/:userId/foods/new’	GET
router.get("/new", (req, res) => {
    res.render("foods/new.ejs");
});

// Update	‘/users/:userId/foods/:itemId’	PUT
router.put("/:itemId", async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user._id);
        const currentFood = foundUser.pantry.id(req.params.itemId);
        currentFood.set(req.body);
        await foundUser.save();
        res.redirect(`/users/${req.session.user._id}/foods`);
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

// Create	‘/users/:userId/foods’	POST
router.post("/", async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user._id);
        foundUser.pantry.push(req.body);
        await foundUser.save();
        res.redirect(`/users/${req.session.user._id}/foods`);
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

// Delete	‘/users/:userId/foods/:itemId’	DELETE
router.delete("/:itemId", async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user._id);
        foundUser.pantry.id(req.params.itemId).deleteOne();
        await foundUser.save();
        res.redirect(`/users/${req.session.user._id}/foods`);
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

// Edit	‘/users/:userId/foods/:itemId/edit’	GET
router.get("/:itemId/edit", async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user._id);
        const currentFood = foundUser.pantry.id(req.params.itemId);
        res.locals.food = currentFood;
        res.render("foods/edit.ejs");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

// Show	‘/users/:userId/foods/:itemId’	GET
router.get("/:itemId", async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user._id);
        const currentFood = foundUser.pantry.id(req.params.itemId);
        res.locals.food = currentFood;
        res.render("foods/show.ejs");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

module.exports = router;
