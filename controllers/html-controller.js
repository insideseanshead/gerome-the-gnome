const { response } = require("express");
var express = require("express");

var router = express.Router();

const db = require("../models");

router.get("/", function (req, res) {
  const lastID = req.query.lastID;
  db.Class.findAll().then((classy) => {
    const classJson = classy.map((classObj) => {
      return classObj.toJSON();
    });
    db.Race.findAll().then(async (racetype) => {
      const raceJson = racetype.map((raceObj) => {
        return raceObj.toJSON();
      });

      const charRender = { classes: classJson, races: raceJson };

      if (lastID == null) {
        console.log("anything");
        res.render("create", { charRender });
      } else {
        const mostRecent = [
          (
            await db.Character.findByPk(lastID, {
              include: [db.Class, db.Race],
            })
          ).toJSON(),
        ];
        console.log(mostRecent);
        res.render("create", { charRender, mostRecent });
      }
    });
  });
});

router.get("/characters", function (req, res) {
  db.Character.findAll({
    include: [db.Class, db.Race],
    order: [["updatedAt", "DESC"]],
  }).then((character) => {
    console.log(character);
    const characterJson = character.map((charObj) => {
      return charObj.toJSON();
    });
    console.log(characterJson);

    const charRender = { characters: characterJson };
    // console.log(characterJson)
    res.render("allChar", charRender);
    // res.json(character)
  });
});

router.get("/search", function (req, res) {
  console.log("in the search route");
  // console.log(req.body);

  db.Character.findAll().then(async (chartype) => {
    const charJson = chartype.map((charObj) => {
      return charObj.toJSON();
    });

    const charRender = { characters: charJson };
    res.render("search", { charRender });
  });
});

router.get("/search/:id", function (req, res) {
  console.log("in the search route");
  console.log(req);
  const lastID = req.params.id;
  console.log(lastID);
  db.Character.findAll().then(async (chartype) => {
    const charJson = chartype.map((charObj) => {
      return charObj.toJSON();
    });

    const charRender = { characters: charJson };

    if (lastID == null) {
      console.log("anything");
      res.render("search", { charRender });
    } else {
      console.log("I made it to else");
      const mostRecent = [
        (
          await db.Character.findByPk(lastID, { include: [db.Class, db.Race] })
        ).toJSON(),
      ];
      console.log(mostRecent);
      res.render("search", { charRender, mostRecent });
    }
  });
});

router.get("/edit", function (req, res) {
  res.render("edit", {});
});

router.delete("/api/delete/:id", function (req, res) {
  console.log("hello");
  // db.Character.destroy({
  //   where: {
  //     id: req.params.id
  //   }
  // }).then(function(characters) {
  //   res.json(characters);
  // });
});

module.exports = router;
