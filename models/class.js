module.exports = function(sequelize, DataTypes) {
    const Class = sequelize.define("Class", {
        title: {
            // Store class titles to be called by user when generating a new character.
            type: DataTypes.STRING,
            allowNull: false
        },
        saveOneName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        saveOneAtt: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        saveTwoName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        saveTwoAtt: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        // str: {
        //     // Store str scores.
        //     type: DataTypes.INT,
        //     allowNull: false
        // },
        // dex: {
        //     // Store dex scores.
        //     type: DataTypes.INT,
        //     allowNull: false
        // },
        // con: {
        //     // Store con scores.
        //     type: DataTypes.INT,
        //     allowNull: false
        // },
        // itl: {
        //     // Store itl scores.
        //     type: DataTypes.INT,
        //     allowNull: false
        // },
        // wis: {
        //     // Store wis scores.
        //     type: DataTypes.INT,
        //     allowNull: false
        // },
        // cha: {
        //     // Store cha scores.
        //     type: DataTypes.INT,
        //     allowNull: false
        // }, 
        // saveOneID: {
        //     // Store saveOneID scores.
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // modOne: {
        //     type: DataTypes.INT,
        //     allowNull: false
        // },
        // saveTwoID: {
        //     // Store saveOneID scores.
        //     type: DataTypes.INT,
        //     allowNull: false
        // },
        // modTwo: {
        //     type: DataTypes.INT,
        //     allowNull: false
        // }
    })
    Class.associate = function(models) {
        // add associations here
        Class.hasMany(models.Character, {
            onDelete: "cascade"
        });
    };
    // Class.hasMany("Character")

    return Class;
}

// In the routes you'd need a Character.addClass(id of the class), for post request