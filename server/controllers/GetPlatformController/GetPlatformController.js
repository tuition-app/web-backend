const {PlatForm} = require("../../models")

const GetPlatformController = async(req,res)=>{
   try {
        const data = await PlatForm.findAll({})
        
        if(!data){
            res.status(400).send({
                success:false,
                error:"No data found"
            })
        }

        res.status(200).send({
            success:true,
            message:"Platform data fetch successfull",
            data:data
        })

   } catch (error) {
       res.status(400).send({
               success:false,
               error:error.message
       })
   }
}


module.exports = {GetPlatformController}