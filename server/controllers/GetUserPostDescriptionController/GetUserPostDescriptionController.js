const {PostAddAbout} = require("../../models");

const GetUserPostDescriptionController = async(req,res)=>{
  try {
     const {currentUserId} = req.body;
     const postAbout = await PostAddAbout.findAll({
        where:{
             currentUserId:currentUserId
        }
     })

     res.status(200).send({
        success:true,
        message:"Successfully get user post description",
        postAbout
       }) 
        
  } catch (error) {
       res.status(400).send({
        success:false,
        message:error.message, //"Error in get user post description"
       })  
  }
}

module.exports = {GetUserPostDescriptionController}