const {MessageModel} = require("../../models")


const MessageController = async(req,res)=>{
  try {
        console.log(req.body);
     const {senderId , receiverId , message} = req.body

     const newMessage = new MessageModel({
          senderId:senderId,
          receiverId:receiverId,
          message:message
     })

     await newMessage.save()

     res.status(200).send({
        success:true,
        message:"Message store successfull",
        // newMessage:newMessage
      })

  } catch (error) {
       res.status(400).send({
         success:false,
         message:"Error in MessageController",
         error
       })  
  }
}


// const MessageDataController = async(req,res)=>{
//      try {
        
//      } catch (error) {
        
//      }   
// }

module.exports = {MessageController}