module.exports = (sequelize, DataType) => {

    const topicsMessages = sequelize.define(
        'topicsmessages', {
            messageID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            topicID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            success: {
                type: DataType.INTEGER
            }
        }
    );

    topicsMessages.associate = (models) => {
        topicsMessages.belongsTo(models.messages, { foreignKey: 'messageID' });
        topicsMessages.belongsTo(models.topics, { foreignKey: 'topicID' })
    }

    return topicsMessages;

}