const { PostClassRequest } = require("../../models")

const BrowsClassRequestController = async(req,res)=>{
  try {
    // console.log(req.body);
    const subject = req.body.subject || null;
    const location = req.body.location || null;
    const sinhala = req.body.sinhala || null;
    const english = req.body.english || null;
    const tamil = req.body.tamil || null;
    const online = req.body.online || null;
    const physical = req.body.physical || null;
    const group = req.body.group || null;
    const individual = req.body.individual || null;

    // console.log(subject, location, sinhala, english, tamil, online, physical, group, individual);

    const data = await PostClassRequest.findAll({});
    const filteredData = data.filter(item => {
      let shouldInclude = true;

      if (subject && item.subject !== subject) {
        shouldInclude = false;
      }

        console.log(item.areas);
      if(!item.areas.includes(location)){
          shouldInclude = false;
      }


      if (shouldInclude && sinhala && item.medium !== sinhala) {
        shouldInclude = false;
      }

      if (shouldInclude && english && item.medium !== english) {
        shouldInclude = false;
      }

      if (shouldInclude && tamil && item.medium !== tamil) {
        shouldInclude = false;
      }

      if (shouldInclude && online && item.platform !== online) {
        shouldInclude = false;
      }

      if (shouldInclude && physical && item.platform !== physical) {
        shouldInclude = false;
      }

      if (shouldInclude && group && item.type !== group) {
        shouldInclude = false;
      }

      if (shouldInclude && individual && item.type !== individual) {
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
    console.error(error); // Log the error for debugging
    res.status(400).send({
        success: false,
        message: error.message
    });
  }
}


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