module.exports = (Sequelize, DataTypes)=>{

        const ClassType = Sequelize.define("ClassType",{
            type:{
                type: DataTypes.STRING,
                allowNull: false,
                validation:{
                   notEmpty: true
                }
            }
            
           
        })
     
        return ClassType;
     
     }