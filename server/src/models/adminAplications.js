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

        console.log("buenasTardes desde User");

    };
    return adminAplication;
};