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


const UserProfileEditController = async (req, res) => {
  console.log(req.body);
  console.log("image path : ", req.file);
  // const googleId = req.body.googleId || null;
  // const displayName = req.body.displayName || null;
  // const email = req.body.email || null;
  // const password = req.body.password || null;

  try {
    const authData = await Auth.findOne({ where: { googleId: req.body.googleId } });

    if (authData) {
      authData.updateProfileName = req.body.displayName || null;
      authData.email = req.body.email;
      authData.updateProfileImage = req.file.path || null;
    }

    await authData.save();

    res.status(200).send({
      success: true,
      message:"User Profile Updated",
      userData : authData
    });

    
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};


const GetUserProfileEditDataController = async(req,res)=>{
  try {
    console.log(req.body);
    const currentUserId = req.body.currentUserId

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


module.exports = {UserProfileController,UserProfileEditController,GetUserProfileEditDataController}