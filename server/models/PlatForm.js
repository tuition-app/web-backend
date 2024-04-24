module.exports = (Sequelize, DataTypes)=>{

        const PlatForm = Sequelize.define("PlatForm",{
            platform:{
                type: DataTypes.STRING,
                allowNull: false,
                validation:{
                   notEmpty: true
                }
            }
            
           
        })
     
        return PlatForm;
     
     }