const { PostClassRequest, Auth, PostCreate, Notification, SelectAllOptionDistrict } = require('../../models');


const PostClassRequestController = async (req, res) => {
  try {
    console.log(req.body);

    const currentUserId = req.body.currentUserId;

    const user = await Auth.findOne({ where: { googleId: currentUserId } });

    // Assign select all option value to the area
    const newData = await SelectAllOptionDistrict.findAll();
    console.log("selected value", newData.length);
    console.log(req.body.area.length);

    for (let i = 0; i < newData.length; i++) {
      for (let j = 0; j < req.body.area.length; j++) {
        // console.log(newData[i].selectedOption[0].value);  
      if (req.body.area[j] === newData[i].selectedOption[0].value) {
        req.body.area[j] = newData[i].selectedOption[0].subValue;
      }
        
      }
    }

    console.log(req.body.area);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User Not Found"
      });
    }

const newPost = await PostClassRequest.create({
      currentUserId: req.body.currentUserId,
      displayName: user.updateProfileName ? user.updateProfileName : user.displayName,
      ImageLink: user.ImageLink,
      email: user.email,
      title: req.body.title,
      about: req.body.about,
      // fees: req.body.fees,
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
        // fees: req.body.fees,
        subject: req.body.subject,
        medium: req.body.medium,
        platform: req.body.platform,
        type: req.body.type
      }
    });

    // console.log("Matching Posts:", matchingPosts);

    for (let i = 0; i < matchingPosts.length; i++) {
      const matchingRecord = await Notification.findOne({
        where: { googleId: matchingPosts[i].currentUserId }
      });

      // console.log("matching Record :",matchingRecord);

      if (matchingRecord) {
        // Update the existing notification record
        await matchingRecord.update({ notification: matchingPosts[i] });
      } else {
        // Create a new notification record
        await Notification.create({
          googleId: matchingPosts[i].currentUserId,
          notification: matchingPosts[i]
        });
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