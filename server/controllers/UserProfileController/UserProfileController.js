const {UserProfileModel,Auth,PostCreate, PostClassRequest} = require("../../models");

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
  // console.log("image path : ", req.file);
  // const googleId = req.body.googleId || null;
  // const displayName = req.body.displayName || null;
  // const email = req.body.email || null;
  // const password = req.body.password || null;

  try {
    const authData = await Auth.findOne({ where: { id: req.body.id } });

    if (authData) {
      if (req.body.displayName) {
        if(authData.displayName==null){
        authData.displayName = req.body.displayName;
      }
      else{
        authData.updateProfileName = req.body.displayName;
      }
      }

      // if (req.body.displayName) authData.about = req.body.about;
      if (req.files['profileImage']) {
        authData.updateProfileImage = req.files['profileImage'][0].path;
      }else{
        authData.ImageLink = req.body.defaultImage;
      }
      if (req.files['nicImage']) authData.nicImage = req.files['nicImage'][0].path;      
      if (req.body.about) authData.about = req.body.about;
      if (req.body.phone) authData.phone = req.body.phone;
      if (req.body.address) authData.address = req.body.address;
      if (req.body.nic) authData.nic = req.body.nic;
      if (req.body.birthday) authData.birthDay = req.body.birthday;
      if (req.body.qualifications) authData.qualification = req.body.qualifications;
    }

    await authData.save();


    const userPosts = await PostCreate.findAll({ where: { currentUserId: req.body.id } });
    const userRequests = await PostClassRequest.findAll({ where: { currentUserId: req.body.id } });

    for (let i = 0; i < userPosts.length; i++) {
      userPosts[i].displayName = req.body.displayName || null;
      await userPosts[i].save();
    }

    for (let i = 0; i < userRequests.length; i++) {
      userRequests[i].displayName = req.body.displayName || null;
      await userRequests[i].save();
    }

    console.log(authData);

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