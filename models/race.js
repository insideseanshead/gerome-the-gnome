module.exports = function(sequelize, DataTypes) {
    const Race = sequelize.define("Race", {
        race: {
            type: DataTypes.STRING,
            allowNull: false
        }
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
