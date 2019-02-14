module.exports = (sequelize, DataType) => {

    const User = sequelize.define(
        'user', {
            deviceToken: {
                type: DataType.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            so: {
                type: DataType.ENUM('android', 'ios', 'web')
            }
        }
    );

    User.associate = (models) => {

    };
    return Apps
}