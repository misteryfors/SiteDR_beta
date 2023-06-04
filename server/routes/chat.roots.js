const Router = require('express')
const Chat = require('../models/chat')
const Message = require('../models/message')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const config = require("config")
const jwt = require("jsonwebtoken")
const {check,validationResult} =require('express-validator')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const Product = require("../models/product.js");
const {ObjectId} = require("mongoose");
const tgController = require("../controllers/telegramController");

router.post('/createChat',
    async (req,res)=>{
        try {
            console.log(req.body)
            let ChatChek =await Chat.find({$or:[{firstUser:req.body.User},{secondUser:req.body.User}]})
            const fUser = User.findOne({_id:req.body.firstUser})
            const sUser = User.findOne({_id:req.body.secondUser})
            const chat = new Chat({firstUser:req.body.firstUser,secondUser:req.body.secondUser,firstUserName:fUser.name,secondUserName:sUser.name,messages:[],chekFirstUser:true, chekSecondUser:false})

            if (fUser & sUser & !ChatChek)
            {
                    await chat.save()
            }
            else {
                    return res.status(500).json({message: "Error"})
            }
            return res.json({
                chats:[chat]
            })
        }catch (e){
            console.log(e)
        }
    })

router.get('/getChats',authMiddleware,
    async (req, res) => {
                try {
                    const Chats = await Chat.find({$or:[{firstUser:req.user.id},{secondUser:req.user.id}]})
                    if (Chats.length>0)
                    return res.json({chats:Chats})
                    else
                        return res.json({chats:null})
                } catch (e) {
                    console.log(e)
                    return res.status(500).json({message: "Can not get files"})
                }
    })
router.post('/sendMessage',
    async (req, res) => {
        try {
            console.log('-------------------------------------')
            //console.log(req.body)
            const chat1 = await Chat.findOne({_id:req.body.chat})
            console.log(chat1)
            const message1 = await new Message({user:req.body.user, date:new Date(), order:req.body.order, message:req.body.message,chat:chat1,chek:false})
            await message1.save()
            if (chat1.firstUser==req.body.user)
            {
                if(!req.body.order)
                tgController.send(1759163276, 'Вам сообщение! ');
                await User.updateOne({_id: chat1.secondUser},{notice:'Вам сообщение'})
                await Chat.updateOne({_id:chat1._id},{chekSecondUser:false})
            }

            else
            {
                await User.updateOne({_id: chat1.firstUser},{notice:'Вам сообщение'})
                await Chat.updateOne({_id:chat1._id},{chekFirstUser:false})
            }

            return res.json({message:message1})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })
router.get('/getMessages',authMiddleware,
    async (req, res) => {
        try {
            console.log("ЧАТ")
            console.log(req.user.id)
            let chat = await Chat.findOne({_id: req.query.chat})
            if (req.user.id == chat.secondUser)
            {
                console.log(chat.secondUser)
                await Chat.updateOne({_id: req.query.chat}, {chekSecondUser: true})
            await Message.updateMany({chat: req.query.chat, user: chat.firstUser}, {chek: true})
            }
            else {
                console.log(chat.firstUser)
                await Chat.updateOne({_id: req.query.chat}, {chekFirstUser: true})
                await Message.updateMany({chat: req.query.chat, user: chat.secondUser}, {chek: true})
            }

            const Messages = await Message.find({chat:req.query.chat})
            return res.json({messages:Messages})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })

router.get('/sendMessage', authMiddleware,
    async (req, res) => {
        try {
            console.log(req.user)
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })


router.post('/sendOrder',
    async (req, res) => {
        try {
            const user = await User.updateOne({_id: jwt.decode(req.body.Firsttoken).id},{$set: {email : req.body.email,password: req.body.password, phone:req.body.phone}})
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })
module.exports = router