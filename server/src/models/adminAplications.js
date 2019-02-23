module.exports = (sequelize, DataType) => {

    const adminAplication = sequelize.define(
        'adminAplications', {
            adminID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            aplicationID: {
                type: DataType.INTEGER,
                primaryKey: true
            }
        }
    )
    adminAplication.associate = (models) => {

        // adminAplication.hasMany(models.admins, { foreignKey: 'aplicationID' });
        // adminAplication.hasMany(models.aplications, { foreignKey: 'adminID' });

    };
    return adminAplication;
};