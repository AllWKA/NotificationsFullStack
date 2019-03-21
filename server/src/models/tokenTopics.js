module.exports = (sequelize, DataType) => {

    const Topics = sequelize.define(
        'topics', {
            userID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            applicationID: {
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
        Topics.belongsTo(models.devicetokens, { foreignKey: 'userID', otherKey: 'applicationID' });
        Topics.belongsTo(models.topics, { foreignKey: 'topicID' })
    }

    return Topics;

}