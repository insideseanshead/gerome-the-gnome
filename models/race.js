module.exports = function(sequelize, DataTypes) {
    const Race = sequelize.define("Race", {
        raceType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        strBonus: {
            type: DataTypes.INTEGER,
        },
        dexBonus: {
            type: DataTypes.INTEGER,
        },
        conBonus: {
            type: DataTypes.INTEGER,
        },
        itlBonus: {
            type: DataTypes.INTEGER,
        },
        wisBonus: {
            type: DataTypes.INTEGER,
        },
        chaBonus: {
            type: DataTypes.INTEGER,
        },    
    })
    Race.associate = function(models) {
        // add associations here
        Race.hasMany(models.Character, {
            onDelete: "cascade"
        });
    };

    return Race;
}

// In the routes you'd need a Character.addRace(id of the race), for post request
