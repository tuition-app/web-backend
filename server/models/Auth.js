module.exports = (Sequelize, DataTypes)=>{

   const Auth = Sequelize.define("Auth",{
       googleId:{
           type: DataTypes.STRING,
           allowNull: true,
           validation:{
              notEmpty: true
           }
       },
       username:{
              type: DataTypes.STRING,
              allowNull: true,
              validation:{
                  notEmpty: true
                }
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
            validation: {
                notEmpty: true
        }},
       displayName:{
           type: DataTypes.STRING,
           allowNull: true,
           validation:{
              notEmpty: true
           }
       },
       updateProfileName:{
           type: DataTypes.STRING,
           allowNull: true,
           validation:{
              notEmpty: true
           }
       },
       updateProfileImage:{
           type: DataTypes.STRING,
           allowNull: true,
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
       ImageLink:{
         type: DataTypes.STRING,
           allowNull: false,
           validation:{
              notEmpty: true
           }
       },
       emailVerified:{
           type: DataTypes.BOOLEAN,
           allowNull: false,
           validation:{
            notEmpty: true
         }
       },
       password: {
        type: DataTypes.STRING,
        allowNull: true,
        validation:{
         notEmpty: true
      }
       },

       nic:{
        type: DataTypes.STRING,
        allowNull: true,
        validation:{
         notEmpty: true
      }
       },

       nicImage:{
         type: DataTypes.STRING,
         allowNull: true,
         validation:{
          notEmpty: true
       }},

         phone:{
            type: DataTypes.STRING,
            allowNull: true,
            validation:{
             notEmpty: true
          } 
        },

        birthDay:{
            type: DataTypes.STRING,
            allowNull: true,
            validation:{
             notEmpty: true
          }},

        address:{type: DataTypes.STRING,
            allowNull: true,
            validation:{
             notEmpty: true
          }
        },
        qualification:{
            type: DataTypes.STRING,
            allowNull: true,
            validation:{
             notEmpty: true
          }
        },

        about:{
            type: DataTypes.STRING,
        allowNull: true,
        validation:{
         notEmpty: true
      }
        },

       jwt:{
         type:DataTypes.STRING,
           allowNull: true,
           validation:{
            notEmpty: true
           }
       },
       otp:{
         type:DataTypes.STRING,
           allowNull: true,
           validation:{
            notEmpty: true
           }
       },
       
      
   })

   return Auth;

}