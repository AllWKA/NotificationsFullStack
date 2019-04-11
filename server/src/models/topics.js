module.exports = (sequelize, DataType) => {

    const Topics = sequelize.define(
        'topics', {
            idTopics: {
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            topic: {
                type: DataType.STRING
            }
        }
    );

    Topics.associate = (models) => {
        Topics.belongsToMany(models.messages, { through: 'topicmessages', foreignKey: 'topicID' });
        Topics.belongsToMany(models.devicetokens, { through: 'tokentopics', foreignKey: 'topicID' });
    }

    return Topics;

}