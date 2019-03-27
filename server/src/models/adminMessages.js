module.exports = (sequelize, DataType) => {

    const adminMessages = sequelize.define(
        'adminmessages', {
            adminID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            messageID: {
                type: DataType.INTEGER,
                primaryKey: true
            }
        }
    );

    adminMessages.associate = (models) => {
        adminMessages.belongsTo(models.admins, { foreignKey: 'adminID' });
        adminMessages.belongsTo(models.messages, { foreignKey: 'messageID' });
    }

    return adminMessages;

}