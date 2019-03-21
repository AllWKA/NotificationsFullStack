module.exports = (sequelize, DataType) => {

    const userApp = sequelize.define(
        'devicetokens', {
            userID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            applicationID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            deviceToken: {
                type: DataType.STRING,
                allowNull: false,
                primaryKey: true,
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
        userApp.belongsTo(models.applications, { foreignKey: 'applicationID' });
        userApp.belongsTo(models.users, { foreignKey: 'userID' });
    };
    return userApp;
}