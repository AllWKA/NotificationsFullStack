module.exports = (sequelize, DataType) => {

    const User = sequelize.define(
        'user', {
            userName: {
                type: DataType.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            email: {
                type: DataType.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            password: {
                type: DataType.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            discriminator: {
                type: DataType.INTEGER,
                allowNull: false
            }
        }
    );
    return Apps
}