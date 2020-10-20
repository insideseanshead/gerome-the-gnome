module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    User.associate = function(models) {
        // add associations here
        User.hasMany(models.Instance,{
            onDelete:'cascade'
        });
    };
    return User;
}