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
        strMod: {
            // Store str scores.
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dexMod: {
            // Store dex scores.
            type: DataTypes.INTEGER,
            allowNull: false
        },
        conMod: {
            // Store con scores.
            type: DataTypes.INTEGER,
            allowNull: false
        },
        itlMod: {
            // Store itl scores.
            type: DataTypes.INTEGER,
            allowNull: false
        },
        wisMod: {
            // Store wis scores.
            type: DataTypes.INTEGER,
            allowNull: false
        },
        chaMod: {
            // Store cha scores.
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        note: {
            type: DataTypes.TEXT
        }
        
        
    })
    Character.associate = function(models) {
        // add associations here
        Character.belongsTo(models.Class);
        Character.belongsTo(models.Race);
    };
    
    // Character.belongsTo(models.Class)

    return Character;
}

