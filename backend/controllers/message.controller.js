import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) =>{
    try{
        const {message} = req.body;
        const {id: reciverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, reciverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, reciverId],
            })
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            message,
        })

        if(newMessage){
            conversation.message.push(newMessage._id);
        }

        // SOCKET IO FUNCTIONALITY WILL GO HERE 
        

        // await conversation.save();
        // await newMessage.save();

        //this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}