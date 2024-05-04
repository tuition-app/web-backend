// Import the postCreate model from the correct path
const { PostCreate, Auth } = require('../../models');


const PostAddController = async (req, res) => {
  try {
    console.log(req.body);
    // console.log("image path : ", req.file);

    // Check if file upload was successful
    if (!req.file || req.file.path === undefined) {
      // Assign a default image path
      req.file = { path: "public\\image\\image_1713841993198.png" };
    }

    // console.log("image path : ", req.file.path);
    const areaArray = req.body.areas.split(',');

    console.log(req.body.areas);

    const array = req.body.areas;
    const length = array.length;
    console.log("size",length); // Output: 1

    // Validate other fields if necessary

    const currentUserId = req.body.id;

    // Assume Auth and PostCreate models are properly defined
    const data = await Auth.findOne({ where: { googleId: currentUserId } });

    // console.log("Data", data);

    const priceNegotiable = req.body.negotiable === 'checked';
    console.log(priceNegotiable);

    // Create a new post using the PostCreate model
    const result = await PostCreate.create({
      currentUserId: req.body.id,
      displayName: data.displayName,
      ImageLink: data.ImageLink,
      email: data.email,
      title: req.body.title,
      about: req.body.about,
      fees: priceNegotiable ? 0 : req.body.fees,
      perHour: req.body.perHour,
      perMonth: req.body.perMonth,
      subject: req.body.subject,
      medium: req.body.medium,
      platform: req.body.platform,
      type: req.body.type,
      areas: req.body.areas,
      UploadImageLink: req.file.path,
      negotiable: priceNegotiable
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
