const { where } = require("sequelize");
const { PostClassRequest, PostAddAbout } = require("../../models")


const BrowsClassRequestController = async (req, res) => {
  try {
    console.log(req.body);
    const { subject, location, sinhala, tamil, english, selectedPlatform, selectedType, selectedGrade } = req.body;
    // const { subject, location } = req.body;

    // console.log(subject, location, sinhala, english, tamil, selectedPlatform, selectType);

    const data = await PostClassRequest.findAll({ where : {
      isAccepted: false,
      isDeleted: false,
      isExpired: false
    }}); // Assuming PostCreate is your Sequelize model

    const filteredData = data.filter(item => {
      let shouldInclude = true;

      // Check subject
      if (subject && item.subject !== subject) {
        shouldInclude = false;
      }

      // Check location
      // if (location && !item.areas.includes(location)) {
      //   shouldInclude = false;
      // }
      if (location && location.length > 0) {
        const itemLocations = typeof item.areas === 'string'
          ? JSON.parse(item.areas)
          : item.areas;
        
        if (!location.some(loc => itemLocations.includes(loc))) {
          shouldInclude = false;
        }
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
      if (selectedPlatform && selectedPlatform.length > 0) {
        const itemPlatforms = typeof item.platform === 'string' 
          ? item.platform.split(',').map(platform => platform.trim()) 
          : item.platform;
        if (!selectedPlatform.some(platform => itemPlatforms.includes(platform))) {
          shouldInclude = false;
        }
      }

      // Check types
      if (selectedType && selectedType.length > 0) {
        const itemTypes = typeof item.type === 'string' 
          ? item.type.split(',').map(type => type.trim()) 
          : item.type;
        if (!selectedType.some(type => itemTypes.includes(type))) {
          shouldInclude = false;
        }
      }

                 // Check grades
                 if (selectedGrade && selectedGrade.length > 0) {
                  const itemGrades = typeof item.grade === 'string' 
                    ? item.grade.split(',').map(grade => grade.trim()) 
                    : item.grade;
                  if (!selectedGrade.some(grade => itemGrades.includes(grade))) {
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



// const BrowsClassRequestController = async (req, res) => {
//   try {
//     // Extracting parameters from request body
//     console.log(req.body);
//     const { subject, location, sinhala, english, tamil, selectedPlatform, selectType } = req.body;

//     // Log the parameters for debugging
//     console.log(subject, location, sinhala, english, tamil, selectedPlatform, selectType);

//     // Fetch all class requests
//     const data = await PostClassRequest.findAll({});

//     // Filter the data based on the criteria
//     const filteredData = data.filter(item => {
//       let shouldInclude = true;

//       // Check subject
//       if (subject && item.subject !== subject) {
//         shouldInclude = false;
//       }

//       // Check location
//       if (location && (!item.areas || !item.areas.includes(location))) {
//         shouldInclude = false;
//       }

//       // Check mediums
//       const mediums = [];
//       if (sinhala) mediums.push('Sinhala');
//       if (english) mediums.push('English');
//       if (tamil) mediums.push('Tamil');
      
//       // console.log(mediums);
//       // console.log(item.medium);
      
//       if (mediums.length > 0) {
//         // Ensure item.medium is an array
//         const itemMediums = Array.isArray(item.medium) 
//           ? item.medium 
//           : item.medium.split(',').map(medium => medium.trim());
      
//         if (!mediums.some(medium => itemMediums.includes(medium))) {
//           shouldInclude = false;
//         }
//       }
      

//       // Check platforms
//       if (selectedPlatform.length > 0) {
//         const itemPlatforms = item.platform.split(',').map(platform => platform.trim());
        
//         console.log(itemPlatforms[0]);

//         if (!selectedPlatform.some(platform => itemPlatforms[0].includes(platform))) {
//           shouldInclude = false;
//         }
//       }

//       // Check types
//       if (selectType.length > 0) {
//         const itemType = item.type.split(',').map(type => type.trim());
//         if (!selectType.some(type => itemType[0].includes(type))) {
//           shouldInclude = false;
//         }
//       }

//       return shouldInclude;
//     });

//     // Respond with the filtered data
//     res.status(200).send({
//       success: true,
//       message: "Data fetched successfully",
//       data: filteredData,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(400).send({
//       success: false,
//       message: error.message
//     });
//   }
// };


const getOneDetailsController = async (req, res) => {
  try {
    console.log(req.body);
    const requestId = req.body.requestId;
    const oneRequestDetails = await PostClassRequest.findOne({ where: { id: requestId, }, });

    console.log(oneRequestDetails);

    const aboutDetails = await PostAddAbout.findOne({ where: { id: oneRequestDetails['about'] } });

    const requestDetailsWithAbout = {
      ...oneRequestDetails.toJSON(),
      aboutDetails : aboutDetails.about
    };

    console.log(requestDetailsWithAbout);

    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: requestDetailsWithAbout,
    });

  } catch (error) {
    res.status(200).send({
      success: false,
      message: error.message,
    })
  }
}





const FilterClassRequestController = async (req, res) => {
  try {
    console.log(req.body);
    const { subject, classArea, sinhala, english, tamil, online, physical, group, individual } = req.body;

    const filterData = [];

    const data = await PostClassRequest.findAll({});

    console.log(data.length);

    for (let i = 0; i < data.length; i++) {
      let areas = data[i].areas.map(area => area.trim());
      console.log(areas.includes(classArea));

      if ((!subject || data[i].subject === subject) &&
        (!classArea || areas.includes(classArea)) &&
        (!sinhala || data[i].medium === sinhala) &&
        (!english || data[i].medium === english) &&
        (!tamil || data[i].medium === tamil) &&
        (!online || data[i].platform === online) &&
        (!physical || data[i].platform === physical) &&
        (!group || data[i].type === group) &&
        (!individual || data[i].type === individual)
      ) {
        filterData.push(data[i]);
      }
    }

    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: filterData
    });


  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    })
  }

}


// Add pagination
const BrowsClassRequestPaginationController = async (req, res) => {
  try {
    const { page } = req.body;
    console.log(page);

    if(page == 0){
      return null
    }

    // Default to page 1 if not provided
    const pageNumber = page ? parseInt(page-1, 10) : 1; // Convert page to integer

    // Define the limit per page
    const limit = 3;

    // Calculate the offset
    const offset = (pageNumber) * limit;

    // Fetch the posts with limit and offset
    const post = await PostClassRequest.findAndCountAll({
      limit,
      offset,
    });

    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: {
        limit:limit,
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

module.exports = { BrowsClassRequestController, FilterClassRequestController,BrowsClassRequestPaginationController, getOneDetailsController }