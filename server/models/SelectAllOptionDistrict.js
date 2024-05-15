module.exports = (Sequelize, DataTypes)=>{

        const SelectAllOptionDistrict = Sequelize.define("SelectAllOptionDistrict",{
            selectedOption:{
                type: DataTypes.JSON,   //store as a json directly
                allowNull: false,
                defaultValue: [], // Default value is an empty array
                validate: {
                    notEmpty: true
                }
            },
         
        })
     
        return SelectAllOptionDistrict;
     
     }