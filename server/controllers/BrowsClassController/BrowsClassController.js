const { PostCreate, PostClassRequest } = require('../../models');

const BrowsClassController = async (req, res) => {
  try {
    console.log(req.body);
    // const { subject, location, sinhala, english, tamil, online, physical, group, individual, mass } = req.body;
    const { subject, location, sinhala, english, tamil, selectedPlatform, group, individual, mass } = req.body;

    console.log(subject, location, sinhala, english, tamil, selectedPlatform, group, individual);

    const data = await PostCreate.findAll({}); // Assuming PostCreate is your Sequelize model
    const filteredData = data.filter(item => {
      let shouldInclude = true;

      if (subject && item.subject !== subject) {
        shouldInclude = false;
      }

      if (location && !item.areas.includes(location)) {
        shouldInclude = false;
      }

      if (shouldInclude && (sinhala || english || tamil) && ![sinhala, english, tamil].includes(item.medium)) {
        shouldInclude = false;
      }

      // Assuming item.platform is a string like "Online,Physical"
      // and selectedPlatform is an array like ['Physical', 'Online']
      const itemPlatforms = item.platform.split(','); // Splitting into an array
      if (selectedPlatform && !itemPlatforms.some(platform => selectedPlatform.includes(platform.trim()))) {
        shouldInclude = false;
      }


      if ((group && !item.type.includes(group)) || (individual && !item.type.includes(individual)) || (mass && !item.type.includes(mass))) {
        shouldInclude = false;
      }

      return shouldInclude;
    });

    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: filteredData
    });

  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
};


const LeftBrowsClassController = async (req, res) => {
  // console.log(req.body);
  try {
    const {
      sinhala,
      english,
      tamil,
      online,
      physical,
      group,
      individual,
    } = req.body;

    const data = await PostCreate.findAll({});
    const mediumArray = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      let shouldInclude = true;

      if (sinhala == null && english == null && tamil == null && online == null && physical == null && group == null && individual == null) {
        mediumArray.push(item);
      }

      if (english && item.medium !== 'English') {
        shouldInclude = false;
      }
      if (sinhala && item.medium !== 'Sinhala') {
        shouldInclude = false;
      }
      if (tamil && item.medium !== 'Tamil') {
        shouldInclude = false;
      }
      if (online && item.platform !== 'Online') {
        shouldInclude = false;
      }
      if (physical && item.platform !== 'Physical') {
        shouldInclude = false;
      }
      if (group && item.type !== 'Group') {
        shouldInclude = false;
      }
      if (individual && item.type !== 'Individual') {
        shouldInclude = false;
      }

      if (shouldInclude) {
        mediumArray.push(item);
      }
    }

    //   console.log(mediumArray);

    res.status(200).send({
      success: true,
      message: 'Data fetched successfully',
      data: mediumArray,
    });

  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};


const getOneDetailsController = async (req, res) => {
  try {
    console.log(req.body);
    const postId = req.body.postId;
    const onePostDetails = await PostCreate.findOne({ where: { id: postId, }, });

    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: onePostDetails,
    })

  } catch (error) {
    res.status(200).send({
      success: false,
      message: error.message,
    })
  }
}



// GET one user created all post
const getConsideringPostController = async (req, res) => {
  try {
    console.log(req.body);

    const createdPost = await PostCreate.findAll({ where: { currentUserId: req.body.currentUserId, }, });
    const createdRequest = await PostClassRequest.findAll({ where: { currentUserId: req.body.currentUserId, }, });

    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      createdPost: createdPost,
      createdRequest: createdRequest,
    })


  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    })
  }
}




module.exports = { BrowsClassController, LeftBrowsClassController, getOneDetailsController, getConsideringPostController };
