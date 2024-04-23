const {Subject} = require("../../models")

const GetSubjectController = async (req, res) => {
        // Get all subject values and sub subject values
        try {
            const responses = await Subject.findAll({});
            const subjects = [];
            const finalArray = []
    
            for (let i = 0; i < responses.length; i++) {
                subjects.push(responses[i].subjects); // Collect subjects in an array
            }
    
            // Flatten the array of sub-subjects using flatMap
        //     const finalArray = subjects.map(subject => subject.subValue);
         subjects.map((item)=>(
            finalArray.push(...item)
         ))
    
            res.status(200).send({
                success: true,
                message: "Subjects fetched successfully",
                data: finalArray // Send all sub-subjects collected in the array
            });
    
        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Error while getting subjects",
                error: error.message // Send the error message for debugging
            });
        }
    };
    
    


module.exports = {GetSubjectController}