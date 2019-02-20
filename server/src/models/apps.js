module.exports = (sequelize, DataType) => {

    const Apps = sequelize.define(
        'aplications',
        {
            idAplication: {
                type: DataType.INTEGER,
                primaryKey: true
            },
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

    Apps.associate = (models) => {
        console.log("buenas desde app");

    }
    return Apps;
}