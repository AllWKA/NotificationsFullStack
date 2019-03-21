module.exports = (sequelize, DataType) => {

    const adminMessages = sequelize.define(
        'adminmessages', {
            AdminID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            MessageID: {
                type: DataType.INTEGER,
                primaryKey: true
            }
        }
    );

    adminMessages.associate = (models) => {
        adminMessages.belongsTo(models.admins, { foreignKey: 'MessageID' });
        adminMessages.belongsTo(models.messages, { foreignKey: 'AdminID' });

    }

    return adminMessages;

}