module.exports = (sequelize, DataType) => {

    const adminAplication = sequelize.define(
        'adminapplications', {
            adminID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            applicationID: {
                type: DataType.INTEGER,
                primaryKey: true
            }
        }
    )
    adminAplication.associate = (models) => {
        adminAplication.belongsTo(models.admins, { foreignKey: 'applicationID' });
        adminAplication.belongsTo(models.applications, { foreignKey: 'adminID' });
    };
    return adminAplication;
};