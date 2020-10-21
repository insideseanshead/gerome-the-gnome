module.exports = function(sequelize, DataTypes) {
    const Character = sequelize.define("Character", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        str: {
            // Store str scores.
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dex: {
            // Store dex scores.
            type: DataTypes.INTEGER,
            allowNull: false
        },
        con: {
            // Store con scores.
            type: DataTypes.INTEGER,
            allowNull: false
        },
        itl: {
            // Store itl scores.
            type: DataTypes.INTEGER,
            allowNull: false
        },
        wis: {
            // Store wis scores.
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cha: {
            // Store cha scores.
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        saveOneID: {
            // Store saveOneID scores.
            type: DataTypes.STRING,
            allowNull: false
        },
        modOne: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        saveTwoID: {
            // Store saveOneID scores.
            type: DataTypes.INTEGER,
            allowNull: false
        },
        modTwo: {
            type: DataTypes.INTEGER,
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

