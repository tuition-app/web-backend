const {UserProfileModel} = require("../../models")

const UserProfileController = async(req,res)=>{
  try {
        
  } catch (error) {
      res.status(400).send({
        success:false,
        message:error.message
      })
  }
}


module.exports = {UserProfileController}