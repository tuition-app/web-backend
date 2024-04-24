const { PostCreate } = require('../../models');

const BrowsClassController = async (req, res) => {
  try {
    console.log(req.body);
    const subject = req.body.subject || null;
    const location = req.body.location || null;
    const sinhala = req.body.sinhala || null;
    const english = req.body.english || null;
    const tamil = req.body.tamil || null;
    const online = req.body.online || null;
    const physical = req.body.physical || null;
    const group = req.body.group || null;
    const individual = req.body.individual || null;

    console.log(subject, location, sinhala, english, tamil, online, physical, group, individual);

    const data = await PostCreate.findAll({});
    const filteredData = data.filter(item => {
      let shouldInclude = true;

      if (subject && item.subject !== subject) {
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
    // res.status(400).send({
    //     success: false,
    //     message: error.message
    // });
  }
};






const LeftBrowsClassController = async (req, res) => {
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
      
      module.exports = LeftBrowsClassController;
      



module.exports = { BrowsClassController,LeftBrowsClassController };
