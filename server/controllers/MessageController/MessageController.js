const moment = require('moment-timezone');
const { Op } = require("sequelize");
const { MessageModel } = require("../../models");
const { Auth } = require("../../models");


const generateRoomId = (id1, id2) => {
    return [id1, id2].sort().join('_');
};

const MessageController = async (req, res) => {
  try {
      const { senderId, receiverId, message, time } = req.body;
      const roomId = generateRoomId(senderId, receiverId);
    //   const time = moment().tz('Asia/Kolkata').toISOString();
      const localizedTime = moment(time).tz('Asia/Kolkata').format();

      const newMessage = new MessageModel({
          senderId: senderId,
          receiverId: receiverId,
          message: message,
          roomId: roomId,
          time : localizedTime,
          isRead: false
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
              time: moment(msg.createdAt).tz('Asia/Kolkata').format('hh:mm A'),
                // time: msg.createdAt,
                date: moment(msg.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD')
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



const ChatListController = async (req, res) => {
    try {
        const { currentUserId } = req.body;

        const sentMessages = await MessageModel.findAll({
            where: {
                senderId: currentUserId
            },
            attributes: ['receiverId'],
            group: ['receiverId']
        });

        const receivedMessages = await MessageModel.findAll({
            where: {
                receiverId: currentUserId
            },
            attributes: ['senderId'],
            group: ['senderId']
        });

        const chatUserIds = new Set([
            ...sentMessages.map(msg => msg.receiverId.toString()),
            ...receivedMessages.map(msg => msg.senderId.toString())
        ]);

        const chatUsers = await Auth.findAll({
            where: {
                id: Array.from(chatUserIds)
            },
            attributes: ['id', 'displayName', 'updateProfileName', 'updateProfileImage', 'ImageLink']
        });

        const chatList = await Promise.all(chatUsers.map(async user => {
            const unreadCount = await MessageModel.count({
                where: {
                    receiverId: currentUserId,
                    senderId: user.id.toString(),
                    isRead: false,
                }
            });

            const lastMessage = await MessageModel.findOne({
                where: {
                    roomId: generateRoomId(currentUserId, user.id.toString())
                },
                order: [['createdAt', 'DESC']]
            });

            return {
                id: user.id.toString(),
                name: user.updateProfileName == null ? user.displayName : user.updateProfileName,
                image: user.updateProfileImage == null ? user.ImageLink : user.updateProfileImage,
                unreadCount,
                lastMessage: lastMessage ? lastMessage.message : '',
                time: moment(lastMessage.createdAt).tz('Asia/Kolkata'),
                lastMessageTime: lastMessage ? moment(lastMessage.createdAt).tz('Asia/Kolkata').format('hh:mm A') : '',
                lastMessageDate: lastMessage ? moment(lastMessage.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD') : '',
            };
        }));

        chatList.sort((a, b) => {
            return new Date(b.time) - new Date(a.time);
        });

        res.status(200).send({
            success: true,
            message: "Chat list fetched successfully",
            chatUsers: chatList
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in fetch list",
            error
        });
    }
};


const MarkMessagesAsRead = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const roomId = generateRoomId(senderId, receiverId);

        await MessageModel.update(
            { isRead: true },
            {
                where: {
                    receiverId,
                    roomId,
                    isRead: false,
                },
            }
        );

        res.status(200).send({
            success: true,
            message: 'Messages marked as read',
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error marking messages as read',
            error,
        });
    }
};




module.exports = { MessageController, MessageDataController, ChatListController, MarkMessagesAsRead };
