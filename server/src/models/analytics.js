module.exports = (sequelize, DataType) => {

    const Analytics = sequelize.define(
        'analytics', {
            idanalytics: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            notificationID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            messageID: {
                type: DataType.INTEGER,
                primaryKey: true
            }
        }
    );
    Analytics.associate = (models) => {
        Analytics.hasOne(models.notifications, { foreignKey: 'notificationID', otherKey: 'messageID' });
    }
    return Analytics;
}