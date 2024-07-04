import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js";

export const sendMessage=async(req,res)=>{
    // console.log("message sent",req.params.id)
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            members:{$all:[senderId,receiverId]}
        })
        
        if(!conversation){
            conversation = await Conversation.create({
                members:[senderId, receiverId]
            })
        }
        console.log(receiverId)
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        console.log(newMessage)
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        
        await Promise.all([conversation.save(),newMessage.save()]);
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
            res.status(201).json(
                newMessage
        );
        
    } catch (error) {
        console.log("error in sendmessage", error);
        res.status(500).json({error:"internal server error"});
    }
}

export const getMessage = async(req,res)=>{
    try {
        const {id:chatUser} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            members:{$all:[senderId,chatUser]}
        }).populate("messages");

        if(!conversation){
            return res.status(201).json([]);
        }

        const messages = conversation.messages;
        return res.status(201).json(messages);
    } catch (error) {
        console.log("error in getmessage", error);
        res.status(500).json({error:"internal server error"});
    }
}