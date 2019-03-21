module.exports = (sequelize, DataType) => {

    const Apps = sequelize.define(
        'applications',
        {
            idApplication: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            applicationName: {
                type: DataType.STRING,
                allowNull: false,
                validate: { notEmpty: true }
            },
            tokenApplication: {
                type: DataType.STRING,
                allowNull: false,
                validate: { notEmpty: true }
            }
        }
    );
    Apps.associate = (models) => {
        Apps.belongsToMany(models.admins, { through: 'adminapplications', foreignKey: 'applicationID' });
        Apps.belongsToMany(models.users, { through: 'devicetokens', foreignKey: 'applicationID' })
    }
    return Apps;
}