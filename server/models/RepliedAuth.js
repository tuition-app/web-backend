module.exports = (Sequelize, DataTypes)=>{

        const RepliedModel = Sequelize.define("RepliedModel",{
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
     
        return RepliedModel;
     
     }