module.exports = (sequelize, DataType) => {

    const TokenNotifications = sequelize.define(
        'tokennotifications', {
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
                primaryKey: true
            },
            notificationID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            success: {
                type: DataType.BOOLEAN
            }
        });
    TokenNotifications.associate = (models) => {
        TokenNotifications.belongsToMany(models.applications, { through: 'messageapplications', foreignKey: 'adminID' });
    }
    return TokenNotifications;
}