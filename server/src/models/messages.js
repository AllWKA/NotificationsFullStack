module.exports = (sequelize, DataType) => {

    const Message = sequelize.define(
        'messages', {
            idMessages: {
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            body: {
                type: DataType.STRING,
                primaryKey: true
            },
            title: {
                type: DataType.STRING,
                primaryKey: true
            },
            label: {
                type: DataType.STRING,
                primaryKey: true
            }
        });
    Message.associate = (models) => {
        Message.belongsToMany(models.applications, { through: 'messagesapplications', foreignKey: 'MessageID' });
        Message.hasMany(models.notifications, { foreignKey: 'messageID', sourceKey: 'idMessages' });
        Message.belongsToMany(models.topics, { through: 'topicmessages', foreignKey: 'messageID' });
        Message.belongsToMany(models.admins, { through: 'adminmessages', foreignKey: 'messageID' });
    }
    return Message;
}