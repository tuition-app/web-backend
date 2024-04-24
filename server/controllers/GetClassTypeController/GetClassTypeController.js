const {ClassType} = require("../../models");

const GetClassTypeController = async(req,res)=>{
  try {
    const data = await ClassType.findAll({});

    if(!data){
      res.status(404).send({
        success:false,
        message:"No data found"
      })
    }

    res.status(200).send({
            success:true,
            message:"Data found",
            data:data
    })
        
  } catch (error) {
       res.status(400).send({
         success:false,
         message:"Error in GetClassTypeController",
         error:error.message
       }) 
  }
}

module.exports = {GetClassTypeController}