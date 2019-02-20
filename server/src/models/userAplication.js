module.exports = (sequelize, DataType) => {

    const userApp = sequelize.define(
        'useraplication', {
            userID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            aplicationID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            deviceToken: {
                type: DataType.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            so: {
                type: DataType.ENUM('android', 'ios', 'web'),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        }
    );

    userApp.associate = (models) => {
        console.log("buenas tardes desde userapp");

    };
    return userApp;
}