const { PostCreate } = require('../../models');

const BrowsClassController = async (req, res) => {
        try {
                console.log(req.body);
                const subject = req.body.subject || null;
                const classArea = req.body.classArea || null;


                const filterData = [];

                const data = await PostCreate.findAll({});

                console.log(data.length);

                for (let i = 0; i < data.length; i++) {
                        let areas = data[i].areas.map(area => area.trim());
                        console.log(areas.includes(classArea));
                       
                        if((!subject || data[i].subject === subject) && (!classArea || areas.includes(classArea))){
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
                });
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
