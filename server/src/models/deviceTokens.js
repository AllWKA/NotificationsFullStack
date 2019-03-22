module.exports = (sequelize, DataType) => {

    const DeviceTokens = sequelize.define(
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

    DeviceTokens.associate = (models) => {
        DeviceTokens.belongsTo(models.applications, { foreignKey: 'applicationID' });
        DeviceTokens.belongsTo(models.users, { foreignKey: 'userID' });
        DeviceTokens.belongsToMany(models.notifications, { through: 'tokennotifications', foreignKey: 'userID', otherKey: 'aplicationID', otherKey: 'deviceToken' });
    };
    return DeviceTokens;
}