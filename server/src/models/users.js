module.exports = (sequelize, DataType) => {

    const User = sequelize.define(
        'users', {
            idUser: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            userName: {
                type: DataType.STRING
            },
            email: {
                type: DataType.STRING
            },
            password: {
                type: DataType.STRING
            }
        }
    );

    User.associate = (models) => {

        console.log("buenasTardes desde User");

    }
    return User
}