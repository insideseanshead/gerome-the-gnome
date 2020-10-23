var express = require("express");

var router = express.Router();

const db = require("../models");

router.get("/", function(req, res) {
    res.render("create", {})
})

router.get("/create", function(req, res) {
    res.render("create", {})
})

router.get("/characters", function(req, res) {
    db.Character.findAll().then(character => {
            const characterJson = character.map(charObj => {
                return charObj.toJSON()
            })
            console.log(characterJson)
            characterJson.forEach(element => {
                element.strMod = Math.floor((element.str-10)/2);
                element.dexMod = Math.floor((element.dex-10)/2);
                element.conMod = Math.floor((element.con-10)/2);
                element.itlMod = Math.floor((element.itl-10)/2);
                element.wisMod = Math.floor((element.wis-10)/2);
                element.chaMod = Math.floor((element.cha-10)/2);
            });
            const charRender = {characters : characterJson}
            console.log(characterJson)
            res.render("allChar", charRender)
            // res.json(character)
        })
        
})

router.get("/search", function(req, res) {
    res.render("search", {})
})

router.get("/edit", function(req, res) {
    res.render("edit", {})
})

// router.delete("/api/characters/:id", function(req, res) {
//     db.Character.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(characters) {
//       res.json(characters);
//     });
//   });

module.exports = router;