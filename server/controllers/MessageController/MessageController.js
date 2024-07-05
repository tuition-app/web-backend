const moment = require('moment-timezone');
const { MessageModel } = require("../../models");

const generateRoomId = (id1, id2) => {
    return [id1, id2].sort().join('_');
};

const MessageController = async (req, res) => {
  try {
      const { senderId, receiverId, message } = req.body;
      const roomId = generateRoomId(senderId, receiverId);
      const time = moment().tz('Asia/Kolkata').toISOString();

      const newMessage = new MessageModel({
          senderId: senderId,
          receiverId: receiverId,
          message: message,
          roomId: roomId,
          time : time
      });

      await newMessage.save();

      res.status(200).send({
          success: true,
          message: "Message stored successfully",
      });
  } catch (error) {
      res.status(400).send({
          success: false,
          message: "Error in MessageController",
          error
      });
  }
};


const MessageDataController = async (req, res) => {
    try {
        const { currentUserId, matchingUserId } = req.body;
        const roomId = generateRoomId(currentUserId, matchingUserId);

        const messageData = await MessageModel.findAll({
            where: {
                roomId: roomId
            }
        });

        res.status(200).send({
          success: true,
          message: "Message Data Fetch Successful",
          messageData: messageData.map(msg => ({
              senderId: msg.senderId.toString(),
              receiverId: msg.receiverId.toString(),
              message: msg.message,
              time: moment(msg.time).tz('Asia/Kolkata').toISOString()
          }))
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in MessageDataController",
            error
        });
    }
};

module.exports = { MessageController, MessageDataController };
