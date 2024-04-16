// app.get("/select",(req, res) => {
//         // Perform select operation
//         const data = User.findAll({where:{id:1}}).then((user)=>{
//             console.log(user);
//             res.send(user)
//         })
//     })

    
//     app.delete("/delete",(req,res)=>{
//         // Perform delete operation
//         User.destroy({where:{id:2}}).then((user)=>{
//             console.log(user);
//             res.send("Data deleted")
//         })
//     })


const {User} = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerController = async(req,res) => {
  try {
     console.log(req.body); 
     const password = req.body.password;
     const salt = await bcrypt.genSalt(10);

     const hashedPassword = await bcrypt.hash(password,salt);
     console.log(hashedPassword);

     req.body.password = hashedPassword;

     User.create({
        email: req.body.UserEmail,
        password: req.body.password,

     }).then((user) => {
             console.log("User created:", user);

             res.status(200).send({
                 success:true,
                 message:"User created",
                 user
             })
     })

  } catch (error) {
      res.status(400).send({
         success:false,
         message:error.message
      })   
  }
}


const loginController = async(req,res) => {
    // console.log(req.body);
     try {
        const email = req.body.UserEmail;
        const password = req.body.password;
     
        if(!email || !password){
            return res.status(400).send({
                success:false,
                message:"Please enter email and password"
            })
        }

        const user = await User.findOne({where:{email:email}});

        if(!user){
            return res.status(400).send({
                success:false,
                message:"User not found"
            })
        }

          const isMatched = await bcrypt.compare(password,user.password);

          if(!isMatched){
              return res.status(400).send({
                  success:false,
                  message:"Invalid email or password"
              })
      
           }

           const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"1d"});

           user.jwt = token;
           await user.save();
           
           res.status(200).send({
                   success:true,
                   message:"Login successful",
                   user
           })
           

     } catch (error) {
         res.status(400).send({
                 success:false,
                 message:error.message
         })
     }   
}


module.exports = {registerController,loginController}