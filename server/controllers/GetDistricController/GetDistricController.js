const {District} = require("../../models");

const GetDistricController = async(req,res) => {
     try {
        const responses = await District.findAll();
        const districts = [];
        const finalArray = []

        for (let i = 0; i < responses.length; i++) {
                districts.push(responses[i].district); // Collect subjects in an array
            }
    
            // Flatten the array of sub-subjects using flatMap
        districts.map((item)=>(
            finalArray.push(...item)
         ))

        res.status(200).send({
            success:true,
            message:"Districts",
            data:finalArray,
        })
        
     } catch (error) {
        res.status(400).send({
           success:false,
           message:error.message
        })
     }      
}

module.exports = {GetDistricController};