const { FeedbackModel } = require("../../models");

const FeedbackController = async (req, res) => {
  try {
    console.log(req.body);

    const data = await FeedbackModel.create({
      reviewerId: req.body.reviewerId ? req.body.reviewerId : " ",
      reviewerName:req.body.reviewerName ? req.body.reviewerName : " ",
      review: req.body.review ? req.body.review : " ",
      description:req.body.description ? req.body.description : " ",
      postId: req.body.postId ? req.body.postId : " ",
    });

    console.log(data);

    res.status(200).send({
      success: true,
      message: "Review Added Successfully",
      data: data
    });

  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in FeedbackController",
      error: error.message
    });
  }
};


const GetFeedbackController = async (req, res) => {
  try {
    const postId = req.body.postId;
    const reviews = []
    // Retrieve all feedback (replace with specific filters if needed)
    const data = await FeedbackModel.findAll({});

    for (let i = 0; i < data.length; i++) {
       if(data[i].postId == postId ){
        reviews.push(data[i])
       }
      
    }

    res.status(200).send({
      success: true,
      message: "Feedback retrieved successfully",
      data:reviews
    });
    
  } catch (error) {
    console.error(error); // Log the actual error for debugging

    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: "An error occurred while fetching feedback", // Generic user-friendly message
    });
  }
};

module.exports = { FeedbackController,GetFeedbackController };
