const { where } = require('sequelize');
const { Op, Sequelize } = require('sequelize');
const moment = require('moment-timezone');
const { PostClassRequest, Auth, PostCreate, PostNotification, RequestNotification ,SelectAllOptionDistrict, PostAddAbout } = require('../../models');


const PostClassRequestController = async (req, res) => {
  try {
    console.log(req.body);

    const currentUserId = req.body.currentUserId;

    const user = await Auth.findOne({ where: { id: currentUserId } });

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

    // add data to the postaddabout table
    const postAddAboutData = await PostAddAbout.create({
      currentUserId: currentUserId,
      about: req.body.about,
      // postId: result['dataValues']['id']
    })

const newPost = await PostClassRequest.create({
      currentUserId: currentUserId,
      displayName: user.updateProfileName ? user.updateProfileName : user.displayName,
      ImageLink: user.ImageLink,
      email: user.email,
      title: 'default',
      about: postAddAboutData['dataValues']['id'],
      // fees: req.body.fees,
      // perHour: req.body.perHour,
      // perMonth: req.body.perMonth,
      subject: req.body.subject,
      level: req.body.level,
      grade: req.body.grade || null,
      medium: req.body.medium,
      platform: req.body.platform,
      type: req.body.type,
      areas: req.body.area,
      isExpired: false,
      isAccepted: false,
      isDeleted: false    
  });

    // Find matching posts based on criteria
    const matchingPosts = await PostCreate.findAll({
      where: {
        // fees: req.body.fees,
        subject: req.body.subject,
        medium: req.body.medium,
        [Op.and]: [
          Sequelize.literal(`JSON_CONTAINS(platform, '["${req.body.platform.join('","')}"]')`),
          Sequelize.literal(`JSON_CONTAINS(type, '["${req.body.type.join('","')}"]')`)
        ],
        isAccepted: false,
        isDeleted: false,
        isExpired: false
      }
    });

    console.log("Matching Posts:", matchingPosts);

    for (let i = 0; i < matchingPosts.length; i++) {
      // const matchingRecord = await Notification.findOne({
      //   where: { id: matchingPosts[i].currentUserId }
      // });

      // console.log("matching Record :",matchingRecord);

      // if (matchingRecord) {
      //   // Update the existing notification record
      //   await matchingRecord.update({ notification: matchingPosts[i] });
      // } else {
        // Create a new notification record
        await RequestNotification.create({
          userId: matchingPosts[i].currentUserId,
          notification: newPost
        });
      // }
    }

    res.status(200).send({
      success: true,
      message: "Post Request Created Successfully",
      // data: matchingPosts,
    });

  } catch (error) {
    console.log(error)
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

      // const threeMonthsAgo = new Date();
    // threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    // for (let post of CreatedPostData) {
    //   if (new Date(post.updatedAt) < threeMonthsAgo) {
    //     post.isExpired = true;
    //     await post.save();
    //   }
    // }

    const fiveMinutesAgo = moment.tz('Asia/Kolkata').subtract(5, 'hours').toDate();

    const updatedRequests = await Promise.all(createClassRequest.map(async (request) => {
      // console.log(request.createdAt);
      // console.log(fiveMinutesAgo);
      if (new Date(request.updatedAt) < fiveMinutesAgo) {
        request.isExpired = true;
        await request.save();
      }
      return request;
    }));

    const requests = await PostClassRequest.findAll({where: {isDeleted: false, isExpired: false, isAccepted: false}});

    res.status(200).send({
      success: true,
      message: "Request Fetch Successfully",
      data: requests
    })


  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Request Fetch Unsuccessfully",
      error
    })
  }
}


const GetAllClassRequestController = async (req, res) => {
  try {
    const createClassRequest = await PostClassRequest.findAll({});

      // const threeMonthsAgo = new Date();
    // threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    // for (let post of CreatedPostData) {
    //   if (new Date(post.updatedAt) < threeMonthsAgo) {
    //     post.isExpired = true;
    //     await post.save();
    //   }
    // }

    const fiveMinutesAgo = moment.tz('Asia/Kolkata').subtract(5, 'hours').toDate();

    const updatedRequests = await Promise.all(createClassRequest.map(async (request) => {
      // console.log(request.createdAt);
      // console.log(fiveMinutesAgo);
      if (new Date(request.updatedAt) < fiveMinutesAgo) {
        request.isExpired = true;
        await request.save();
      }
      return request;
    }));

    const requests = await PostClassRequest.findAll({where: {isDeleted: false}});


    res.status(200).send({
      success: true,
      message: "Request Fetch Successfully",
      data: requests
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
    const currentUserId = req.body.currentUserId;

    const notificationResponse = await Notification.findAll({where: {googleId: currentUserId}});

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



const acceptedController = async (req, res) => {
  try {
    const { id } = req.body.id;
    const request = await PostClassRequest.findOne({ where: {id: req.body.id} });

    request.isAccepted = true;
    await request.save();

    res.status(200).send({
      success: true,
      message: "Request Accepted Successfully",
      data: request
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Request Accepted Unsuccessfully",
      error: error.message
    })
  }
}

const deleteController = async (req, res) => {
  try {
    console.log(req.body.id);

    const { id } = req.body.id;
    const request = await PostClassRequest.findOne({ where: { id: req.body.id } });

    request.isDeleted = true;
    await request.save();

    res.status(200).send({
      success: true,
      message: "Request Deleted Successfully",
      data: request
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Request Rejected Unsuccessfully",
      error: error.message
    })
  }
}


const retainController = async (req, res) => {
  try {

    console.log(req.body.id);
    const { id } = req.body.id;
    const request = await PostClassRequest.findOne({ where: { id: req.body.id } });

    request.isExpired = false;
    request.createdAt = moment().toDate();
    await request.save();

    res.status(200).send({
      success: true,
      message: "Request Reatined Successfully",
      data: request
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Request Retaining Unsuccessfull",
      error: error.message
    })
  }
}




module.exports = { PostClassRequestController, GetClassRequestController, GetNotificationController, GetAllClassRequestController, acceptedController, deleteController, retainController };