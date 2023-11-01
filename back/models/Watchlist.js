module.exports = (sequelize, dataTypes) => {
    const Watchlist = sequelize.define("Watchlist", {
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
    Watchlist.associate = (models) => {
        Watchlist.belongsTo(models.Human, {
            foreignKey:'humanId',
            as: 'human'
        })
    }
    return Watchlist
}