module.exports = (sequelize, DataType) => {

    const MessegesApplications = sequelize.define(
        'messegesapplications', {
            MessegeID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            ApplicationID: {
                type: DataType.INTEGER,
                primaryKey: true
            }
        });
    MessegesApplications.associate = (model) => {
        MessegesApplications.belongsTo(model.messages, { foreignKey: 'ApplicationID' });
        MessegesApplications.belongsTo(model.applications, { foreignKey: 'MessegeID' });
    }
    return MessegesApplications;
};