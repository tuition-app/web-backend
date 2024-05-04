module.exports = (Sequelize, DataTypes)=>{

        const UserProfileModel = Sequelize.define("UserProfileModel",{
            googleId:{
                type: DataTypes.STRING,
                allowNull: true,
                validation:{
                   notEmpty: true
                }
            },
            fullName:{
                type: DataTypes.STRING,
                allowNull: true,
                validation:{
                   notEmpty: true
                }
            },
            email:{
                type: DataTypes.STRING,
                allowNull: true,
                validation:{
                   notEmpty: true
                }
            },
            UploadImageLink: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    notEmpty: true
                }
            },

            // password: {
            //     type: DataTypes.STRING,
            //     allowNull: false,
            //     validate: {
            //         notEmpty: false
            //     }
            // },
            
           
        })
     
        return UserProfileModel;
     
     }