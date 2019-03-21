module.exports = (sequelize, DataType) => {

    const MessegesApplications = sequelize.define(
        'messegesapplications', {
            MessegeID: {
                type: DataType.INTEGER,
                primaryKey: true
            },
            ApplicationID: {
                type: DataType.INTEGER,
                primaryKey: true
            }

        })
    MessegesApplications.associate = (model) => {
        console.log("jaja saludos");

    }
    return MessegesApplications;
};