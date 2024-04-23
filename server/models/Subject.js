module.exports = (Sequelize, DataTypes)=>{

        const Subject = Sequelize.define("Subject",{
            subjects: {
                type: DataTypes.JSON,   //store as a json directly
                allowNull: false,
                defaultValue: [], // Default value is an empty array
                validate: {
                    notEmpty: true
                }
            },
        })
     
        return Subject;
     
     }