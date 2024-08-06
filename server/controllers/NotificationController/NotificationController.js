const { PostNotification, RequestNotification, PostCreate, PostClassRequest } = require('../../models'); 

const NotificationRequestController = async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID is required"
      });
    }

    const notifications = await RequestNotification.findAll({ where: { userId } });

    console.log(notifications);
    
    res.status(200).send({
      success: true,
      data : notifications
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error retrieving notifications",
      error: error.message
    });
  }
};

const NotificationPostsController = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID is required"
      });
    }

    const notifications = await PostNotification.findAll({ where: { userId } });

    console.log(notifications);

    res.status(200).send({
      success: true,
      data : notifications
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error retrieving notifications",
      error: error.message
    });
  }
};

const ExpiredPostController = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID is required"
      });
    }

    const expiredPosts = await PostCreate.findAll({ where: { 
      currentUserId: userId,
      isExpired:true,
      isAccepted:false,
      isDeleted:false
    } });

    console.log(expiredPosts);

    res.status(200).send({
      success: true,
      data : expiredPosts
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error retrieving expired posts",
      error: error.message
    });
  }
};

const ExpiredRequestController = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID is required"
      });
    }

    const expiredRequests = await PostClassRequest.findAll({ where: { 
      currentUserId: userId,
      isExpired:true,
      isAccepted:false,
      isDeleted:false
    } });

    console.log(expiredRequests);

    res.status(200).send({
      success: true,
      data : expiredRequests
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error retrieving expired posts",
      error: error.message
    });
  }
};

const deletePostNotificationController = async (req, res) => {
  try {
    const post = await PostNotification.findOne({ where: { id: req.body.id } });

    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Notification not found"
      });
    }
    
    await PostNotification.delete({ where: { id: req.body.id } });

    res.status(200).send({
      success: true,
      message: "Notification Deleted Successfully",
      data: post
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Notification Deletion Unsuccessful",
      error: error.message
    });
  }
};



const deleteRequestNotificationController = async (req, res) => {
  try {
    const post = await RequestNotification.findOne({ where: { id: req.body.id } });

    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Notification not found"
      });
    }

    await RequestNotification.delete({ where: { id: req.body.id } });

    res.status(200).send({
      success: true,
      message: "Notification Deleted Successfully",
      data: post
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Notification Deletion Unsuccessful",
      error: error.message
    });
  }
};



module.exports = {
  NotificationRequestController,
  NotificationPostsController,
  ExpiredPostController,
  ExpiredRequestController,
  deletePostNotificationController,
  deleteRequestNotificationController
};
