module.exports = (Sequelize, DataTypes)=>{

        const FeedbackModel = Sequelize.define("FeedbackModel",{
            reviewerId:{
                type: DataTypes.STRING,
                allowNull: true,
                default:'',
                validation:{
                   notEmpty: false
                }
            },
            review:{
                type: DataTypes.INTEGER,
                allowNull: true,
                validation:{
                   notEmpty: true
                }
            },
            postId:{
                type: DataTypes.STRING,
                allowNull: true,
                validation:{
                   notEmpty: true
                }
            }
           
        })
     
        return FeedbackModel;
     
     }