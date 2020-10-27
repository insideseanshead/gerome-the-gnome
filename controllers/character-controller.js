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
    console.log(req.body.mainatr);
    if (req.body.mainatr === "str") {
      postObj = {
        str: parseInt(rollArr[0]) + raceBonusJson.strBonus,
        dex: parseInt(rollArr[1]) + raceBonusJson.dexBonus,
        con: parseInt(rollArr[2]) + raceBonusJson.conBonus,
        itl: parseInt(rollArr[3]) + raceBonusJson.itlBonus,
        wis: parseInt(rollArr[4]) + raceBonusJson.wisBonus,
        cha: parseInt(rollArr[5]) + raceBonusJson.chaBonus
      };
    } else if (req.body.mainatr === "dex") {
      postObj = {
        str: parseInt(rollArr[1]) + raceBonusJson.strBonus,
        dex: parseInt(rollArr[0]) + raceBonusJson.dexBonus,
        con: parseInt(rollArr[2]) + raceBonusJson.conBonus,
        itl: parseInt(rollArr[3]) + raceBonusJson.itlBonus,
        wis: parseInt(rollArr[4]) + raceBonusJson.wisBonus,
        cha: parseInt(rollArr[5]) + raceBonusJson.chaBonus
      };
    } else if (req.body.mainatr === "con") {
      postObj = {
        str: parseInt(rollArr[1]) + raceBonusJson.strBonus,
        dex: parseInt(rollArr[2]) + raceBonusJson.dexBonus,
        con: parseInt(rollArr[0]) + raceBonusJson.conBonus,
        itl: parseInt(rollArr[3]) + raceBonusJson.itlBonus,
        wis: parseInt(rollArr[4]) + raceBonusJson.wisBonus,
        cha: parseInt(rollArr[5]) + raceBonusJson.chaBonus
      };
    } else if (req.body.mainatr === "itl") {
      postObj = {
        str: parseInt(rollArr[1]) + raceBonusJson.strBonus,
        dex: parseInt(rollArr[2]) + raceBonusJson.dexBonus,
        con: parseInt(rollArr[3]) + raceBonusJson.conBonus,
        itl: parseInt(rollArr[0]) + raceBonusJson.itlBonus,
        wis: parseInt(rollArr[4]) + raceBonusJson.wisBonus,
        cha: parseInt(rollArr[5]) + raceBonusJson.chaBonus
      };
    } else if (req.body.mainatr === "wis") {
      postObj = {
        str: parseInt(rollArr[1]) + raceBonusJson.strBonus,
        dex: parseInt(rollArr[2]) + raceBonusJson.dexBonus,
        con: parseInt(rollArr[3]) + raceBonusJson.conBonus,
        itl: parseInt(rollArr[4]) + raceBonusJson.itlBonus,
        wis: parseInt(rollArr[0]) + raceBonusJson.wisBonus,
        cha: parseInt(rollArr[5]) + raceBonusJson.chaBonus
      };
    } else if (req.body.mainatr === "cha") {
      postObj = {
        str: parseInt(rollArr[1]) + raceBonusJson.strBonus,
        dex: parseInt(rollArr[2]) + raceBonusJson.dexBonus,
        con: parseInt(rollArr[3]) + raceBonusJson.conBonus,
        itl: parseInt(rollArr[4]) + raceBonusJson.itlBonus,
        wis: parseInt(rollArr[5]) + raceBonusJson.wisBonus,
        cha: parseInt(rollArr[0]) + raceBonusJson.chaBonus
      };
    }

    // append on all modifiers

    postObj.strMod = Math.floor((postObj.str - 10) / 2);
    postObj.dexMod = Math.floor((postObj.dex - 10) / 2);
    postObj.conMod = Math.floor((postObj.con - 10) / 2);
    postObj.itlMod = Math.floor((postObj.itl - 10) / 2);
    postObj.wisMod = Math.floor((postObj.wis - 10) / 2);
    postObj.chaMod = Math.floor((postObj.cha - 10) / 2);

    

    console.table(postObj);

    const myClassID = parseInt(req.body.class)
    const myRaceID = parseInt(req.body.race)
    console.log(req.body);
    
    db.Character.create({
      first_name: firstName,
      last_name: lastN,
      str: postObj.str,
      dex: postObj.dex,
      con: postObj.con,
      itl: postObj.itl,
      wis: postObj.wis,
      cha: postObj.cha,
      strMod: postObj.strMod,
      dexMod: postObj.dexMod,
      conMod: postObj.conMod,
      itlMod: postObj.itlMod,
      wisMod: postObj.wisMod,
      chaMod: postObj.chaMod,
      ClassId: myClassID,
      RaceId: myRaceID,
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

router.delete("/api/delete/:id", (req, res) => {
  console.log(req.params.id);
  db.Character.destroy({ where: { id: req.params.id } }).then(deathChar => {
    console.log("Deleted");
    res.json(deathChar);
  });
});

router.put("/api/edit/:id", (req, res) => {
  

  db.Character.update({
    note: req.body.note
  }, {
    where: {
      id: req.params.id
    }
  }).then(editCharacter => {
    res.json(editCharacter);
  }).catch(err => {
    res.status(500).send("Encounted an error with update")
  })
})

// =====================================
// Seed Data Goes Here for heroku
// router.get("/api/seeds",(req,res)=>{
//   const classes = [
//     {
//         title: "fighter",
//         saveOneName: "str",
//         saveOneAtt: 2,
//         saveTwoName: "con",
//         saveTwoAtt: 2
//     },
//     {
//         title: "rogue",
//         saveOneName: "dex",
//         saveOneAtt: 2,
//         saveTwoName: "itl",
//         saveTwoAtt: 2
//     },
//     {
//         title: "wizard",
//         saveOneName: "itl",
//         saveOneAtt: 2,
//         saveTwoName: "wis",
//         saveTwoAtt: 2
//     },
//     {
//         title: "cleric",
//         saveOneName: "wis",
//         saveOneAtt: 2,
//         saveTwoName: "cha",
//         saveTwoAtt: 2
//     }
// ]

// const races = [
//     {
//         raceType: "human",
//         strBonus: 1,
//         dexBonus: 1,
//         conBonus: 1,
//         itlBonus: 1,
//         wisBonus: 1,
//         chaBonus: 1
//     },
//     {
//         raceType: "dwarf",
//         strBonus: 0,
//         dexBonus: 0,
//         conBonus: 2,
//         itlBonus: 0,
//         wisBonus: 0,
//         chaBonus: 0
//     },
//     {
//         raceType: "elf",
//         strBonus: 0,
//         dexBonus: 2,
//         conBonus: 0,
//         itlBonus: 0,
//         wisBonus: 0,
//         chaBonus: 0
//     },
//     {
//         raceType: "halfling",
//         strBonus: 0,
//         dexBonus: 2,
//         conBonus: 0,
//         itlBonus: 0,
//         wisBonus: 0,
//         chaBonus: 0
//     },
//     {
//         raceType: "gnome",
//         strBonus: 0,
//         dexBonus: 0,
//         conBonus: 0,
//         itlBonus: 2,
//         wisBonus: 0,
//         chaBonus: 0
//     }
// ]
//   db.Class.bulkCreate(classes).then(data => {
//     db.Race.bulkCreate(races).then(results =>{
//       res.send("seeded")
//     })
//   })
// })
// ====================================


module.exports = router;
