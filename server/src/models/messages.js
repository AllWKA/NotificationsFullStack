module.exports = (sequelize, DataType) => {

    const Message = sequelize.define(
        'messages', {
            idMessages: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            body: {
                type: DataType.STRING
            },
            title: {
                type: DataType.STRING
            },
            label: {
                type: DataType.STRING
            }
        });
    Message.associate = (models) => {
        Message.belongsToMany(models.applications, { through: 'messagesapplications', foreignKey: 'ApplicationID' });
        Message.hasMany(models.notifications, { foreignKey: 'messageID', sourceKey: 'idMessages' });
        Message.belongsToMany(models.topics, { through: 'topicmessages', foreignKey: 'messageID' });
        Message.belongsToMany(models.admins, { through: 'adminmessages', foreignKey: 'messageID' });
    }
    return Message;
}