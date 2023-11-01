module.exports = (sequelize, DataTypes) => {
    const Human = sequelize.define("Human", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        confirmPassword: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    Human.associate = (models) => {
        Human.hasMany(models.Watched, {
            foreignKey: 'humanId',
            as: 'watched'
        })
        Human.hasMany(models.Watchlist, {
            foreignKey: 'humanId',
            as: 'watchlist'
        })
        Human.hasMany(models.Top, {
            foreignKey: 'humanId',
            as: 'top'
        })
    }
    
    return Human
}