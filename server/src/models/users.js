module.exports = (sequelize, DataType) => {

    const User = sequelize.define(
        'users', {
            idUser: {
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            applicationName: {
                type: DataType.STRING,
                primaryKey: true
            },
            email: {
                type: DataType.STRING,
                primaryKey: true
            },
            userName: {
                type: DataType.STRING
            },
            password: {
                type: DataType.STRING
            }
        }
    );

    User.associate = (models) => {
        User.belongsToMany(models.applications, {
            as: 'devices', through: 'devicetokens',
            foreignKey: 'userID'
        })
    }
    return User
}