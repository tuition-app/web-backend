const { PostClassRequest } = require("../../models")

const BrowsClassRequestController = async(req,res)=>{
  try {

    console.log(req.body);
    const sinhala = req.body.sinhala;
    const english = req.body.english;
    const tamil = req.body.tamil;
    const physical = req.body.physical;
    const online = req.body.online;
    const group = req.body.group;
    const individual = req.body.individual;

    const data = await PostClassRequest.findAll({})

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

//     console.log(data);

    res.status(200).send({
        success:true,
        message:"Data filter successfull",
        data:mediumArray,
    })

        
  } catch (error) {
      res.status(400).send({
        success:false,
        message:error.message
      })  
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