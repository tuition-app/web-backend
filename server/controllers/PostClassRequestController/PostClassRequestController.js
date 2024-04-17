const { PostClassRequest, Auth, PostCreate , Notification } = require('../../models');


const PostClassRequestController = async (req, res) => {
  try {
    console.log(req.body);

    const currentUserId = req.body.currentUserId;

    const user = await Auth.findOne({ where: { googleId: currentUserId } });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User Not Found"
      });
    }

    const newPost = await PostClassRequest.create({
      currentUserId: req.body.currentUserId,
      displayName: user.displayName,
      ImageLink: user.ImageLink,
      email: user.email,
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

    // Find matching posts based on criteria
    const matchingPosts = await PostCreate.findAll({
      where: {
        fees: req.body.fees,
        subject: req.body.subject,
        medium: req.body.medium,
        platform: req.body.platform,
        type: req.body.type
      }
    });

    console.log("Matching Posts:", matchingPosts);

    for (let i = 0; i < matchingPosts.length; i++) {
      const relatedUser = await Auth.findOne({ where: { googleId: matchingPosts[i].currentUserId } });
      if (relatedUser) {
            // Update notifications for the related user
            await relatedUser.update({ notification: [i] });
          }
    }

    res.status(200).send({
      success: true,
      message: "Post Request Created Successfully",
      data: matchingPosts,
    });

  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
      error,
    });
  }
};



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


const GetNotificationController = async (req, res) => {
 try {
   const notificationResponse = await Notification.findAll({});

   res.status(200).send({
     success: true,
     message: "Notification Fetch Successfully",
     data: notificationResponse
   })
 } catch (error) {
   res.status(400).send({
     success: false,
     message: "Request Fetch Unsuccessfully",
     error
   })
 }
}


module.exports = { PostClassRequestController, GetClassRequestController, GetNotificationController }