
module.exports = (Sequelize, DataTypes) => {
    const MessageModel = Sequelize.define("MessageModel", {
        senderId: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                notEmpty: true
            }
        },
        receiverId: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                notEmpty: true
            }
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                notEmpty: true
            }
        },
        roomId: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                notEmpty: true
            }
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
            // defaultValue: Sequelize.NOW
        }
    });

    return MessageModel;
};
