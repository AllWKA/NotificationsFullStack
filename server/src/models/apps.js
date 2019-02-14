module.exports = (sequelize, DataType) => {

    const Apps = sequelize.define(
        'aplication',
        {
            aplicationName: {
                type: DataType.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            tokenAplication: {
                type: DataType.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        }
    );
    return Apps;
}