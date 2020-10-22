const express = require("express");

const router = express.Router();

const db = require("../models");
// Random Name Creation
const Nomina = require("nomina");
const nomina = new Nomina();

// For Dice Rolls
const { roll } = require("trpg-dice");
const dice = require("trpg-dice");

router.get("/api/all", (req, res) => {
  db.Character.findAll().then((character) => {
    res.json(character);
    console.log(character);
  });
});

router.get("/api/raceOne", (req, res) => {
    db.Race.findOne({ WHERE: { id: 1 } }).then(racialBonus => {
        let raceBonusJson = racialBonus.toJSON();
        console.log(raceBonusJson);
        res.send(raceBonusJson);
    });
  });

router.post("/api/makechar", function (req, res) {
  //make a query to get ne race base on req.body.race and inside the .then of that do all of your magic
  db.Race.findOne({ WHERE: { id: req.body.race } }).then((racialBonus) => {
    let raceBonusJson = racialBonus.toJSON();
  
  // Create an Author with the data available to us in req.body
  console.log(req.body);
  let firstName = "";
  if (req.body.genderT === "male") {
    firstName = maleName();
  } else {
    firstName = femaleName();
  }
  const lastN = lastName();
  console.log("======================================");
  console.log(firstName);
  console.log(lastN);
  console.log("======================================");
  // Make object based main attribute
  const rollArr = statRoll();
  var postObj = {};
  if (req.body.mainAtr === "str") {
    postObj = {
      str: rollArr[0],
      dex: rollArr[1],
      con: rollArr[2],
      itl: rollArr[3],
      wis: rollArr[4],
      cha: rollArr[5],
    };
  } else if (req.body.mainAtr === "dex") {
    postObj = {
      str: rollArr[1],
      dex: rollArr[0],
      con: rollArr[2],
      itl: rollArr[3],
      wis: rollArr[4],
      cha: rollArr[5],
    };
  } else if (req.body.mainAtr === "con") {
    postObj = {
      str: rollArr[1],
      dex: rollArr[2],
      con: rollArr[0],
      itl: rollArr[3],
      wis: rollArr[4],
      cha: rollArr[5],
    };
  } else if (req.body.mainAtr === "itl") {
    postObj = {
      str: rollArr[1],
      dex: rollArr[2],
      con: rollArr[3],
      itl: rollArr[0],
      wis: rollArr[4],
      cha: rollArr[5],
    };
  } else if (req.body.mainAtr === "wis") {
    postObj = {
      str: rollArr[1],
      dex: rollArr[2],
      con: rollArr[3],
      itl: rollArr[4],
      wis: rollArr[0],
      cha: rollArr[5],
    };
  } else if (req.body.mainAtr === "cha") {
    postObj = {
      str: rollArr[1],
      dex: rollArr[2],
      con: rollArr[3],
      itl: rollArr[4],
      wis: rollArr[5],
      cha: rollArr[0],
    };
  }

  console.table(postObj);
  // =========================
  db.Character.create({
    first_name: firstName,
    last_name: lastN,
    str: postObj.str,
    dex: postObj.dex,
    con: postObj.con,
    itl: postObj.itl,
    wis: postObj.wis,
    cha: postObj.cha,
    ClassId: req.body.class,
    RaceId: req.body.race,
  }).then(function (dbCharacter) {
    res.json(dbCharacter);
  });
});
});

const femaleName = function () {
  female = {
    theme: "medieval",
    type: "female",
  };
  const result = nomina.generate(femaleName);
  console.log(result);
  return result;
};

const maleName = function () {
  male = {
    theme: "medieval",
    type: "male",
  };
  const result = nomina.generate(maleName);
  console.log(result);
  return result;
};

const lastName = function () {
  lastN = {
    theme: "medieval",
  };
  const result = nomina.generate(lastName);
  console.log(result);
  return result;
};

const statRoll = function () {
  function callback(err, result) {
    if (err) {
      throw err;
    } else {
      console.log(JSON.stringify(result.rolls[0].result));
      if (result.rolls[0].result > largestNumber) {
        if (largestNumber == 0) {
          largestNumber = result.rolls[0].result;
        } else {
          largestNumber = result.rolls[0].result;
          numbers.push(JSON.stringify(largestNumber));
        }
      } else {
        numbers.push(JSON.stringify(result.rolls[0].result));
      }
    }
  }
  const numbers = [];
  let largestNumber = 0;
  for (i = 0; i < 6; i++) {
    result = dice.roll("3d6", callback);
  }
  numbers.unshift(JSON.stringify(largestNumber));
  console.log(numbers);
  return numbers;
};
module.exports = router;
