module.exports = (sequelize, DataType) => {

    const Admin = sequelize.define(
        'admins', {
            idAdmin: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            userName: {
                type: DataType.STRING
            },
            email: {
                type: DataType.STRING
            },
            password: {
                type: DataType.STRING
            },
            discriminator: {
                type: DataType.INTEGER
            }
        }
    );

    Admin.associate = (models) => {

        Admin.belongsToMany(models.aplications, {through: 'adminaplications', foreignKey: 'adminID'});

    };
    return Admin;
}