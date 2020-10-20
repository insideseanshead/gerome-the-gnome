module.exports = function(sequelize, DataTypes) {
    const Character = sequelize.define("Character", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
        // ,
        // classID: {
        //     type: sequelize.INTEGER,
        //     references: {model: "Class",key: "id"},
            
        // }
    })
    Character.associate = function(models) {
        // add associations here
        Character.belongsTo(models.Class);
        Character.belongsTo(models.Race);
    };
    
    // Character.belongsTo(models.Class)

    return Character;
}

