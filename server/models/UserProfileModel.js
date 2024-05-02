module.exports = (Sequelize, DataTypes)=>{

        const UserProfileModel = Sequelize.define("UserProfileModel",{
            fullName:{
                type: DataTypes.STRING,
                allowNull: false,
                validation:{
                   notEmpty: true
                }
            },
            email:{
                type: DataTypes.STRING,
                allowNull: false,
                validation:{
                   notEmpty: true
                }
            },
            UploadImageLink: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    notEmpty: false
                }
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: false
                }
            },
            
           
        })
     
        return UserProfileModel;
     
     }