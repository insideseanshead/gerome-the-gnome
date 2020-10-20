module.exports = function(sequelize, DataTypes) {
    const Instance = sequelize.define("User", {
        notes: {
            type: DataTypes.TEXT,
        },
    })
    Instance.associate = function(models) {
        // add associations here
        Instance.belongsTo(models.User);
    };
    

    return Instance;
}