module.exports = (sequelize, DataType) => {

    const Topics = sequelize.define(
        'topics', {
            messageID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            topicID: {
                type: DataType.INTEGER,
                primaryKey: true
            }
        }
    );

    Topics.associate = (models) => {
        Topics.belongsTo(models.messages, { foreignKey: 'messageID' });
        Topics.belongsTo(models.topics, { foreignKey: 'topicID' })
    }

    return Topics;

}