const { PostClassRequest } = require("../../models")

const BrowsClassRequestController = async (req, res) => {
  try {
    const { subject, location, sinhala, english, tamil, online, physical, group, individual,mass } = req.body;

    const data = await PostClassRequest.findAll({});
    const filteredData = data.filter(item => {
      let shouldInclude = true;

      if (subject && item.subject !== subject) {
        shouldInclude = false;
      }

      // Check if at least one area matches the provided location
      if (location && !item.areas.some(area => area === location)) {
        shouldInclude = false;
      }

      if (shouldInclude && (sinhala || english || tamil) && ![sinhala, english, tamil].includes(item.medium)) {
        shouldInclude = false;
      }

      if ((online && !item.platform.includes(online)) || (physical && !item.platform.includes(physical))) {
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


const FilterClassRequestController = async(req,res)=>{
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
     success:false,
     message:error.message
   })
 }

}

module.exports = {BrowsClassRequestController,FilterClassRequestController}