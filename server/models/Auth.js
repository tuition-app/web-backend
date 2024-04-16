module.exports = (Sequelize, DataTypes)=>{

   const Auth = Sequelize.define("Auth",{
       googleId:{
           type: DataTypes.STRING,
           allowNull: false,
           validation:{
              notEmpty: true
           }
       },
       displayName:{
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
       jwt:{
         type:DataTypes.STRING,
           allowNull: false,
           validation:{
            notEmpty: true
           }
       }
       
      
   })

   return Auth;

}