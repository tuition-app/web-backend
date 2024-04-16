module.exports = (Sequelize, DataTypes)=>{

        const User = Sequelize.define("User",{
            // userName:{
            //     type: DataTypes.STRING,
            //     allowNull: false,
            //     validation:{
            //        notEmpty: true
            //     }
            // },

            email:{
                type: DataTypes.STRING,
                allowNull: false,
                validation:{
                    notEmpty: true,
                }
            },

            password:{
                type: DataTypes.STRING,
                allowNull: false,
                validation:{
                    notEmpty: true,
                }
            },

            jwt:{
                type: DataTypes.STRING,
                allowNull: true,
            },

            otp:{
                type: DataTypes.STRING,
                allowNull: true,
            }
           
        })
 
        return User;

}