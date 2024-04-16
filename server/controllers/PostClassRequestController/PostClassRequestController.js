const { PostClassRequest, Auth, PostCreate } = require('../../models');


const PostClassRequestController = async (req, res) => {
  try {
    console.log(req.body);

    const currentUserId = req.body.currentUserId;

    const data = await Auth.findOne({ where: { googleId: currentUserId } })

    if (!data) {
      return res.status(400).send({
        success: false,
        message: "User Not Found"
      })
    }

    // Create a new post using the postCreate model
    const result = await PostClassRequest.create({
      currentUserId: req.body.currentUserId,
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
      areas: req.body.area,
    });

    // Match post
    const CreatePostData = await PostCreate.findAll({})
    const availabilityPost = []

    const createdPostLength = CreatePostData.length;

    for (let i = 0; i < createdPostLength; i++) {
      if ((CreatePostData[i].fees == req.body.fees) && (CreatePostData[i].subject == req.body.subject) && (CreatePostData[i].medium == req.body.medium) && (CreatePostData[i].platform == req.body.platform) && (CreatePostData[i].type == req.body.type)){
        // Send a success response with the created post data
        availabilityPost.push(CreatePostData[i]);
      }     
    }

    console.log("availabilityPost",availabilityPost);

    
    // if(availabilityPost.length > 0){
    //   res.status(200).send({
    //     success: true,
    //     message: "Post Request Matching Successfully",
    //     availabilityPost:availabilityPost.length,
    //  });
    // }

    res.status(200).send({
          success: true,
          message: "Post Request Create Successfully",
          data:data,
       });


    // console.log(createdPostLength);
    // Send a success response with the created post data
    

  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
      error
    })
  }
}


const GetClassRequestController = async (req, res) => {
  try {
    const createClassRequest = await PostClassRequest.findAll({});

    res.status(200).send({
      success: true,
      message: "Request Fetch Successfully",
      data: createClassRequest
    })

  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Request Fetch Unsuccessfully",
      error
    })
  }
}


const NotificationController = async (req, res) => {

}


module.exports = { PostClassRequestController, GetClassRequestController, NotificationController }