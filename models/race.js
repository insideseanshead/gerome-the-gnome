module.exports = function(sequelize, DataTypes) {
    const Race = sequelize.define("Race", {
        race: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    Race.associate = function(models) {
        // add associations here
        Race.belongsToMany(models.Character);
    };

    return Race;
}

// In the routes you'd need a Character.addRace(id of the race), for post request
