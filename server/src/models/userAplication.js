module.exports = (sequelize, DataType) => {

    const userApp = sequelize.define(
        'useraplications', {
            userID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            aplicationID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            deviceToken: {
                type: DataType.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            so: {
                type: DataType.ENUM('android', 'ios', 'web'),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        }
    );

    userApp.associate = (models) => {
        userApp.belongsTo(models.aplications, { foreignKey: 'aplicationID' });
        userApp.belongsTo(models.users, { foreignKey: 'userID' });
    };
    return userApp;
}