module.exports = (Sequelize, DataTypes) => {

    const Notification = Sequelize.define("Notification", {
        userId:{
            type: DataTypes.STRING,
            allowNull: false,
            validation:{
               notEmpty: true
            }
        },
        notification: {
            type: DataTypes.JSON,   //store as a json directly
            allowNull: false,
            defaultValue: [], // Default value is an empty array
            validate: {
                notEmpty: true
            }
        }


    })

    return Notification;

}