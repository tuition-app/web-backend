// MessageModel

module.exports = (Sequelize, DataTypes)=>{

        const MessageModel = Sequelize.define("MessageModel",{
            senderId:{
                type: DataTypes.STRING,
                allowNull: false,
                validation:{
                   notEmpty: true
                }
            },
            receiverId:{
                type: DataTypes.STRING,
                allowNull: false,
                validation:{
                   notEmpty: true
                }
            },
            message:{
                type: DataTypes.STRING,
                allowNull: false,
                validation:{
                   notEmpty: true
                }
            },        
        })
    
        return MessageModel;
     
     }