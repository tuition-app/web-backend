const {UserProfileModel,Auth} = require("../../models")

const UserProfileController = async(req,res)=>{
  try {
    const currentUserId = req.body.currentUserId

    console.log(currentUserId);
    
    const userData = await Auth.findOne({where:{ googleId:currentUserId }})

    res.status(200).send({
      success:true,
      message:"User Profile",
      userData : userData
    })

        
  } catch (error) {
      res.status(400).send({
        success:false,
        message:error.message
      })
  }
}


module.exports = {UserProfileController}