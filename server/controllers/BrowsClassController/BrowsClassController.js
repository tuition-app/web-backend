const { PostCreate, PostClassRequest } = require('../../models');

const BrowsClassController = async (req, res) => {
  try {
    console.log(req.body);
    const { subject, location, sinhala, english, tamil, selectedPlatform, selectType } = req.body;

    console.log(subject, location, sinhala, english, tamil, selectedPlatform, selectType);

    const data = await PostCreate.findAll({}); // Assuming PostCreate is your Sequelize model

    const filteredData = data.filter(item => {
      let shouldInclude = true;

      // Check subject
      if (subject && item.subject !== subject) {
        shouldInclude = false;
      }

      // Check location
      if (location && !item.areas.includes(location)) {
        shouldInclude = false;
      }

      // Check mediums
      const mediums = [];
      if (sinhala) mediums.push('Sinhala');
      if (english) mediums.push('English');
      if (tamil) mediums.push('Tamil');

      if (mediums.length > 0 && !mediums.includes(item.medium)) {
        shouldInclude = false;
      }

      // Check platforms
      if (selectedPlatform.length > 0) {
        const itemPlatforms = item.platform.split(',').map(platform => platform.trim());
        if (!selectedPlatform.some(platform => itemPlatforms.includes(platform))) {
          shouldInclude = false;
        }
      }

      // Check types
      if (selectType.length > 0) {
        const itemType = item.type.split(',').map(type => type.trim());
        if (!selectType.some(type => itemType.includes(type))) {
          shouldInclude = false;
        }
      }

      return shouldInclude;
    });

    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: filteredData,
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

    const { page, currentUserId } = req.body;
    console.log(page);

    // Default to page 1 if not provided or invalid
    const pageNumber = parseInt(page, 10) || 1;

    // Define the limit per page
    const limit = 2;

    // Calculate the skip based on pageNumber and limit
    const offset = (pageNumber - 1) * limit;

    // Fetch created posts with pagination
    const createdPost = await PostCreate.findAll({
      where: { currentUserId },
      limit,
      offset
    });

    // Fetch total number of created posts
    const totalCreatedPost = await PostCreate.count({
      where: { currentUserId }
    });

    // Fetch created requests with pagination
    const createdRequest = await PostClassRequest.findAll({
      where: { currentUserId },
      limit,
      offset
    });

    // Fetch total number of created requests
    const totalCreatedRequest = await PostClassRequest.count({
      where: { currentUserId }
    });

    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      limit,
      createdPost,
      createdRequest,
      totalCreatedPost,
      totalCreatedRequest,
      currentPage: pageNumber,
      totalPagesPost: Math.ceil(totalCreatedPost / limit),
      totalPagesRequest: Math.ceil(totalCreatedRequest / limit)
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};


// Add pagination
const BrowsClassPaginationController = async (req, res) => {
  try {
    const { page } = req.body;
    console.log(page);

    if (page == 0) {
      return null
    }

    // Default to page 1 if not provided
    const pageNumber = page ? parseInt(page - 1, 10) : 1; // Convert page to integer

    // Define the limit per page
    const limit = 5;

    // Calculate the offset
    const offset = (pageNumber) * limit;

    // Fetch the posts with limit and offset
    const post = await PostCreate.findAndCountAll({
      limit,
      offset,
    });

    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: {
        posts: post.rows,
        total: post.count,
        totalPages: Math.ceil(post.count / limit),
        currentPage: pageNumber,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};





module.exports = { BrowsClassController, LeftBrowsClassController, getOneDetailsController, getConsideringPostController, BrowsClassPaginationController };
