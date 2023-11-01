module.exports = (sequelize, dataTypes) => {
    const Top = sequelize.define("Top", {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        year: {
            type: dataTypes.STRING,
            allowNull: true
        },
        runtime: {
            type: dataTypes.STRING,
            allowNull: true
        },
        type: {
            type: dataTypes.STRING,
            allowNull: true
        },
        poster: {
            type: dataTypes.STRING,
            allowNull: true
        }
    })
    Top.associate = (models) => {
        Top.belongsTo(models.Human, {
            foreignKey:'humanId',
            as: 'human'
        })
    }
    return Top
}