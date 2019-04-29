module.exports = (sequelize, DataType) => {

    const UserTopics = sequelize.define(
        'usertopics', {
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

    UserTopics.associate = (models) => {
        UserTopics.belongsTo(models.devicetokens, { foreignKey: 'userID', otherKey: 'applicationID' });
        UserTopics.belongsTo(models.topics, { foreignKey: 'topicID' })
    }
    return UserTopics;

}