const db = require("../models")
const classes = [
    {
        title: "fighter",
        saveOneName: "str",
        saveOneAtt: 2,
        saveTwoName: "con",
        saveTwoAtt: 2
    },
    {
        title: "rogue",
        saveOneName: "dex",
        saveOneAtt: 2,
        saveTwoName: "itl",
        saveTwoAtt: 2
    },
    {
        title: "wizard",
        saveOneName: "itl",
        saveOneAtt: 2,
        saveTwoName: "wis",
        saveTwoAtt: 2
    },
    {
        title: "cleric",
        saveOneName: "wis",
        saveOneAtt: 2,
        saveTwoName: "cha",
        saveTwoAtt: 2
    }  
]

const races = [
    {
        raceType: "human",
        strBonus: 1,
        dexBonus: 1,
        conBonus: 1,
        itlBonus: 1,
        wisBonus: 1,
        chaBonus: 1
    },
    {
        raceType: "dwarf",
        strBonus: 0,
        dexBonus: 0,
        conBonus: 2,
        itlBonus: 0,
        wisBonus: 0,
        chaBonus: 0
    },
    {
        raceType: "elf",
        strBonus: 0,
        dexBonus: 2,
        conBonus: 0,
        itlBonus: 0,
        wisBonus: 0,
        chaBonus: 0
    },
    {
        raceType: "halfling",
        strBonus: 0,
        dexBonus: 2,
        conBonus: 0,
        itlBonus: 0,
        wisBonus: 0,
        chaBonus: 0
    }
]
db.sequelize.sync({ force: true }).then(function() {
    return Promise.all([db.Class.bulkCreate(classes),db.Race.bulkCreate(races)])
  });
// db.Class.bulkCreate([
//     {
//         title: "Fighter",
//         saveOneName: "str",
//         saveOneAtt: 2,
//         saveTwoName: "con",
//         saveTwoAtt: 2
//     },
//     {
//         title: "Rogue",
//         saveOneName: "str",
//         saveOneAtt: 2,
//         saveTwoName: "con",
//         saveTwoAtt: 2
//     },
//     {
//         title: "Wizard",
//         saveOneName: "str",
//         saveOneAtt: 2,
//         saveTwoName: "con",
//         saveTwoAtt: 2
//     },
//     {
//         title: "Cleric",
//         saveOneName: "str",
//         saveOneAtt: 2,
//         saveTwoName: "con",
//         saveTwoAtt: 2
//     }
    
// ]).then(function(classDB){
//     db.Race.bulkCreate([

//     ])
// })