module.exports = (Sequelize, DataTypes) => {

    const RequestNotification = Sequelize.define("RequestNotification", {
        userId:{
            type: DataTypes.STRING,
            allowNull: false,
            validation:{
               notEmpty: true
            }
        },
        notification: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
            validate: {
                notEmpty: true
            }
        }


    })

    return RequestNotification;

}