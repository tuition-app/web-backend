// Import the postCreate model from the correct path
const { PostCreate,Auth } = require('../../models');


const PostAddController = async (req, res) => {
  try {
    console.log(req.body.title);
    console.log("image path : ", req.file.path);

    // Check if the 'areas' field is provided and not empty
    if (!req.body.areas || req.body.areas.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Error: 'areas' field is required and cannot be empty."
      });
    }

    // Validate other fields if necessary

    const currentUserId = req.body.id;

    // Assume Auth and PostCreate models are properly defined
    const data = await Auth.findOne({ where: { googleId: currentUserId } });

    console.log("Data", data);

    // Create a new post using the PostCreate model
    const result = await PostCreate.create({
      currentUserId: req.body.id,
      displayName: data.displayName,
      ImageLink: data.ImageLink,
      email: data.email,
      title: req.body.title,
      about: req.body.about,
      fees: req.body.fees,
      perHour: req.body.perHour,
      perMonth: req.body.perMonth,
      subject: req.body.subject,
      medium: req.body.medium,
      platform: req.body.platform,
      type: req.body.type,
      areas: req.body.areas,
      UploadImageLink: req.file.path
    });

    console.log(result);

    // Send a success response with the created post data
    res.status(200).send({
      success: true,
      message: "Post Created Successfully",
      data: result
    });
  } catch (error) {
    // Handle errors and send an error response
    res.status(400).send({
      success: false,
      message: "Error occurred while creating Post",
      error: error.message
    });
  }
};

 

const GetPostAddController = async(req,res)=>{
  try {
    const CreatedPostData = await PostCreate.findAll({});
     
    if(!CreatedPostData){

      res.status(404).send({
         success:false,
         message:"Not Found Created Post.",

      })
    }

    res.status(200).send({
       success:true,
       message:"Post Created Data",
       data:CreatedPostData
    })
  } catch (error) {
   res.status(400).send({
       success:false,
       message:"Created Post Data Get Unsuccessfully.",
       error:error.message
    })
  }
}


const imageUploadController = async(req,res)=>{
  //  console.log(req.file.path);
  console.log(req.body.id);
   try {
     const result = await PostCreate.findOne({where:{currentUserId:req.body.id}})
     console.log(result);

     result.UploadImageLink = req.file.path;
     result.save();

     res.status(200).send({
       success:true,
       message:"Image Uploaded Successfully.",
       data:result
     })

   } catch (error) {
      res.status(400).send({
         success:false,
         message:"Image Upload Unsuccessfully.",
         error:error.message
      })
   }
}

module.exports = { PostAddController,GetPostAddController,imageUploadController };
