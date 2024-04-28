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


const MessageDataController = async(req,res)=>{
     try {
        console.log(req.body);
        const currentUserId = req.body.currentUserId
        const receive_messages = []

        const messageData = await MessageModel.findAll({})

        for (let i = 0; i < messageData.length; i++) {
          if(messageData[i].receiverId === currentUserId){
              receive_messages.push(messageData[i])
          }
          
        }

        res.status(200).send({
            success:true,
            message:"Message Data Fetch Successfull",
            receive_messages
        })


     } catch (error) {
         res.status(400).send({
             success:false,
             message:"Error in MessageDataController",
             error
         })
     }   
}

module.exports = {MessageController,MessageDataController}