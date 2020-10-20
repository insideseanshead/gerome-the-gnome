module.exports = function(sequelize, DataTypes) {
    const Save = sequelize.define("Save", {
        saveName: {
            type: DataTypes.STRING,
        },
        attMod: {
            type: DataTypes.STRING,
        }
    })
    return Save;
}