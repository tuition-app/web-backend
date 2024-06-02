const { FeedbackModel } = require("../../models");

const FeedbackController = async (req, res) => {
  try {
    console.log(req.body);

    const data = await FeedbackModel.create({
      reviewerId: req.body.reviewerId ? req.body.reviewerId : " ",
      review: req.body.review ? req.body.review : " ",
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

module.exports = { FeedbackController };
