module.exports = (Sequelize, DataTypes)=>{

        const District = Sequelize.define("District",{
            district: {
                type: DataTypes.JSON,   //store as a json directly
                allowNull: false,
                defaultValue: [], // Default value is an empty array
                validate: {
                    notEmpty: true
                }
            },
        })
     
        return District;
     
     }