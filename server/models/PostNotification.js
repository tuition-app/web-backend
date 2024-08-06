module.exports = (Sequelize, DataTypes) => {

    const PostNotification = Sequelize.define("PostNotification", {
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

    return PostNotification;

}