// Import the postCreate model from the correct path
const { PostCreate, Auth, PostAddAbout, PostClassRequest, SelectAllOptionDistrict } = require('../../models');


const PostAddController = async (req, res) => {
  try {
    console.log(req.body);
    console.log("image path : ", req.file);

    // Check if file upload was successful
    if (!req.file || req.file.path === undefined) {
      // Assign a default image path
      req.file = { path: "public\\image\\image_1713841993198.png" };
    }

    const areaArray = req.body.areas.split(','); // Split by comma
    const selectedTypes = req.body.type.split(',');
    const selectedPlatforms = req.body.platform.split(',');
    const selectedGrades = req.body.grade.split(',');

    // Assign select all option value to the area
    const newData = await SelectAllOptionDistrict.findAll();
    console.log("selected value", newData.length);

    for (let i = 0; i < newData.length; i++) {
      for (let j = 0; j < areaArray.length; j++) {
        // console.log(newData[i].selectedOption[0].value);  
      if(areaArray[j] === newData[i].selectedOption[0].value ){
        areaArray[j] = newData[i].selectedOption[0].subValue;
      }
    }
  }

    console.log("new array",areaArray)

    // Create a new post using the PostCreate model
    const array = req.body.areas;
    const length = array.length;
    console.log("size", length); // Output: 1

    const currentUserId = req.body.id;

    // Assume Auth and PostCreate models are properly defined
    const data = await Auth.findOne({ where: { id: currentUserId } });

        // add data to the postaddabout table
        const postAddAboutData = await PostAddAbout.create({
          currentUserId: currentUserId,
          about: req.body.about,
          // postId: result['dataValues']['id']
        })


    // console.log(priceNegotiable);

    // Create a new post using the PostCreate model
    const result = await PostCreate.create({
      currentUserId: req.body.id,
      displayName: data.updateProfileName ? data.updateProfileName : data.displayName,
      ImageLink: data.ImageLink,
      email: data.email,
      title: req.body.title,
      about: postAddAboutData['dataValues']['id'],
      // fees: priceNegotiable ? 0 : req.body.fees,
      fees:req.body.fees,
      perHour: req.body.perHour,
      perDay: req.body.perDay,
      perMonth: req.body.perMonth,
      subject: req.body.subject,
      level: req.body.level,
      grade:selectedGrades || null,
      medium: req.body.medium,
      platform: selectedPlatforms,
      type: selectedTypes,
      areas: areaArray,
      UploadImageLink: req.file.path,
      negotiable: req.body.negotiable,
    });

    console.log(result);



    //       // Find matching posts based on criteria
    // const matchingRequests = await PostClassRequest.findAll({
    //   where: {
    //     // fees: req.body.fees,
    //     subject: req.body.subject,
    //     medium: req.body.medium,
    //     platform: req.body.platform,
    //     type: req.body.type
    //   }
    // });

    // console.log("Matching Requests:", matchingRequests);

    // for (let i = 0; i < matchingRequests.length; i++) {
    //   const matchingRecord = await Notification.findOne({
    //     where: { googleId: matchingRequests[i].currentUserId }
    //   });

    //   // console.log("matching Record :",matchingRecord);

    //   if (matchingRecord) {
    //     // Update the existing notification record
    //     await matchingRecord.update({ notification: matchingRequests[i] });
    //   } else {
    //     // Create a new notification record
    //     await Notification.create({
    //       googleId: matchingRequests[i].currentUserId,
    //       notification: matchingRequests[i]
    //     });
    //   }
    // }

    // res.status(200).send({
    //   success: true,
    //   message: "Post Request Created Successfully",
    //   data: matchingPosts,
    // });

    // Send a success response with the created post data
    res.status(200).send({
      success: true,
      message: "Post Created Successfully",
      data: result,
      postAddAboutData: postAddAboutData,
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


const GetPostAddController = async (req, res) => {
  try {
    const CreatedPostData = await PostCreate.findAll({});

    if (!CreatedPostData) {

      res.status(404).send({
        success: false,
        message: "Not Found Created Post.",

      })
    }

    res.status(200).send({
      success: true,
      message: "Post Created Data",
      data: CreatedPostData
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Created Post Data Get Unsuccessfully.",
      error: error.message
    })
  }
}


const imageUploadController = async (req, res) => {
  //  console.log(req.file.path);
  console.log(req.body.id);
  try {
    const result = await PostCreate.findOne({ where: { currentUserId: req.body.id } })
    console.log(result);

    result.UploadImageLink = req.file.path;
    result.save();

    res.status(200).send({
      success: true,
      message: "Image Uploaded Successfully.",
      data: result
    })

  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Image Upload Unsuccessfully.",
      error: error.message
    })
  }
}

module.exports = { PostAddController, GetPostAddController, imageUploadController };
