var express = require("express");

var router = express.Router();

router.get("/", function(req, res) {
    res.render("create", {})
})

router.get("/create", function(req, res) {
    res.render("create", {})
})

router.get("/all", function(req, res) {
    db.Character.findAll({}).then(character => {
            const characterJson = character.map(charObj => {
                return charObj.toJSON()
            })
            console.log(characterJson)
        })
        // res.render("all", {})
    res.send("Hello its working")
})

router.get("/search", function(req, res) {
    res.render("search", {})
})

router.get("/edit", function(req, res) {
    res.render("edit", {})
})