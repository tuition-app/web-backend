const {RepliedModel , MessageModel} = require("../../models")


const ReplyController = async(req,res)=>{
   console.log(req.body);

   try {
    const {senderId , receiverId , message} = req.body

    const saveData = new RepliedModel({
         senderId : senderId,
         receiverId : receiverId,
         message : message
    })

    const newMessage = new MessageModel({
        senderId:senderId,
        receiverId:receiverId,
        message:message
   })

   await newMessage.save()

    await saveData.save()

    res.status(200).send({
        success:true,
        message:"Reply send successfull",
        saveData
     })
        
   } catch (error) {
        res.status(400).send({
           success:false,
           message:"Reply send have an error",
           error
        })
   }
}


const GetReplyController = async(req,res)=>{
  try {
    const currentUserId = req.body.currentUserId
    const replyArray = []

    console.log(currentUserId);

    const reply = await RepliedModel.findAll({})

    for (let i = 0; i < reply.length; i++) {
       if (reply[i].senderId == currentUserId) {
          replyArray.push(reply[i])
       }
        
    }

    // console.log(reply);
    res.status(200).send({
        success:true,
        message:"Reply get successfull",
        replyArray
     })

  } catch (error) {
     res.status(200).send({
        success:false,
        message:"Reply get have an error",
        error
     })   
  }
}


module.exports = {ReplyController,GetReplyController}