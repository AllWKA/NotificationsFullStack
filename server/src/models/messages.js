module.exports = (sequelize, DataType) => {

    const Message = sequelize.define(
        'messages', {
            idMessage: {
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
        Message.belongsToMany(models.applications, { through: 'messageapplications', foreignKey: 'adminID' });
    }
    return Message;
}