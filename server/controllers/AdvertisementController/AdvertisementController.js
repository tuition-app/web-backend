// Import the postCreate model from the correct path
const { where } = require('sequelize');
const { Advertisement } = require('../../models');

const AdvertisementAddController = async (req, res) => {
  try {
    console.log(req.body);
    console.log("image path : ", req.file);

    if (!req.file || req.file.path === undefined) {
      req.file = { path: "public\\image\\image_1713841993198.png" };
    }

    const result = await Advertisement.create({
      currentUserId: req.body.id,
      title: req.body.title,
      description: req.body.description,
      image: req.file.path,
      isExpired: false,
      isDeleted: false
    });

    console.log(result);

    res.status(200).send({
      success: true,
      message: "Advertisement Added Successfully"
    });

  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error occurred while creating advertisement",
      error: error.message
    });
  }
};


const GetAdvertisementController = async (req, res) => {
  try {
    const Ads = await Advertisement.findAll({});

    if (!Ads) {
      res.status(404).send({
        success: false,
        message: "Not Found Created Post.",
      })
    }

    res.status(200).send({
      success: true,
      message: "Ads Data",
      data: Ads
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Created Ads Data Get Unsuccessfull.",
      error: error.message
    })
  }
}

const GetSingleAdvertisementController = async (req, res) => {
  try {
    const Ad = await Advertisement.findOne({ where: { id: req.body.id } });

    if (!Ad) {
      res.status(404).send({
        success: false,
        message: "Not Found Ad.",
      })
    }

    res.status(200).send({
      success: true,
      message: "Ad Created Data",
      data: Ad
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Created Ad Data Get Unsuccessfull.",
      error: error.message
    })
  }
}


module.exports = { AdvertisementAddController, GetAdvertisementController, GetSingleAdvertisementController };
