const Router = require('express')
const Product = require('../models/product.js')
const Order = require('../models/order')
const {check,validationResult} =require('express-validator')
const User = require("../models/user")
const fileService = require('../services/fileService')
const fileController = require('../controllers/fileController')
const authMiddleware = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = new Router()
const tgController = require('../controllers/telegramController.js')
const OrderChat = require("../models/orderChat.js");
const Chat = require("../models/chat");
const Message = require("../models/message");
const OrderMessage =require("../models/orderMessage")
router.post('/upload', fileController.uploadFile)
router.post('/createOrder',
    [
        //check('name','Uncorrect name').isLength({min:3,max:100}),
        //check('type','Uncorrect type').isLength({min:3,max:100}),
        //check('mark','Uncorrect mark').isLength({min:3,max:100}),
        //check('price','Uncorrect price').isFloat,
    ],
    async (req,res)=>{
        try {

            const {adress, fio, phone, type, mark, timeInUse, comment, urgency, time, imgs} =req.body
            let user =req.body.user ? req.body.user: null
            console.log(adress, fio, phone, type, mark, timeInUse, comment, urgency, time, imgs, user)
            const order = new Order({adress, phone, fio, type, mark, timeInUse, comment, urgency, time, imgs, user,chek:false,status:"Новая заявка",history:[]})
            console.log(order)
            await order.save()
            const fUser = await User.findOne({_id:req.body.user})
            const sUser = await User.findOne({_id:'647abf547718cac675e1aaaf'})
            const orderChat = new OrderChat({order:order._id,firstUser:req.body.user,secondUser:'647abf547718cac675e1aaaf',firstUserName:fUser.name,secondUserName:sUser.name,chekFirstUser:false,chekSecondUser:false})
            await orderChat.save();
            await User.updateOne({_id: '647abf547718cac675e1aaaf'},{notice:'Новый заказ'})
            tgController.send(1759163276, 'Новый заказ! \nАдресс: '+adress+'\nФио: '+ fio+'\nТелефон: '+ phone+'\nТип: '+ type+'\nМарка: '+ mark+'\nВремя в использовании: '+ timeInUse+'\nКомментарий: '+ comment+'\nСрочная: '+ urgency +'\nЖелательное время: '+ time);
            return res.json({order})
        }catch (e){
            console.log(e)
            console.log("aeaeazzz")
        }
    })
router.post('/redactOrder',
    [
        //check('name','Uncorrect name').isLength({min:3,max:100}),
        //check('type','Uncorrect type').isLength({min:3,max:100}),
        //check('mark','Uncorrect mark').isLength({min:3,max:100}),
        //check('price','Uncorrect price').isFloat,
    ],
    async (req,res)=>{
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:'Uncorrect request', errors})
            }
            console.log(req.body.imgs)
            console.log(req.body)
            const newOrder = await Order.updateOne({_id: req.body.id},{$set:{adress:req.body.adress, fio:req.body.fio, phone:req.body.phone, type:req.body.type, mark:req.body.mark, timeInUse:req.body.timeInUse, comment:req.body.comment, urgency:req.body.urgency, time:req.body.time, imgs:req.body.imgs,chek:false,master:null}})
            console.log(newOrder)

            return res.json({message:"Product was redacted"})
        }catch (e){
            console.log(e)
        }
    })
router.post('/commentOrder',
    [
        //check('name','Uncorrect name').isLength({min:3,max:100}),
        //check('type','Uncorrect type').isLength({min:3,max:100}),
        //check('mark','Uncorrect mark').isLength({min:3,max:100}),
        //check('price','Uncorrect price').isFloat,
    ],
    async (req,res)=>{
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:'Uncorrect request', errors})
            }
            const comment = new Comment({user:req.body.user, date:new Date(), comment:req.body.comment})
            comment.save()


            return res.json({comment})
        }catch (e){
            console.log(e)
        }
    })

const ItemsPerPage=12
router.get('/getOrders',authMiddleware,
    async (req, res) => {
        const page=req.query.currentPage || 1
        console.log('-------------------------------------------------')
        console.log(req.query)
        try {
            let fUser = await User.findOne({_id:req.user.id})
            let query={};
            console.log(req.query.all)
            console.log(fUser)
            if (fUser.role=="admin" && req.query.all=='true')
            {
                console.log(111)
                query={};
            }
            else
            if (req.user.id && req.query.user=='true')
            {
                console.log(222)
                console.log("=-=-=-=-==--=-=-=aaaaaaaaaa=--=-=")
                query={$or:[{user:req.user.id},{master:req.user.id}]};
            }
            else
            {
                console.log(333)
                query={master:null};
            }
            const count = await Order.find(query).count()
            const pageCount = Math.ceil(count / ItemsPerPage)

            let skip;
            console.log(pageCount,page)
            if(req.query.revers==='true')
            {
                skip =((pageCount-page) * ItemsPerPage)-(ItemsPerPage-(count-((pageCount-1) * ItemsPerPage)))
            }
            else
            {skip =(page-1) * ItemsPerPage}
            let products;
            console.log("======================================");
            console.log(req.query);
            console.log(req.user.id);

                products = await Order.find(query).skip(skip>=0?skip:0).limit(skip>=0?ItemsPerPage:ItemsPerPage+skip)

            return res.json({pagination:{count,pageCount},products})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })
router.get('/getOrder',
    async (req, res) => {
        try {

            await Order.updateOne({_id:req.query.orderId},{chek:true})
            const order = await Order.findOne({_id:req.query.orderId})
            const orderChat = await OrderChat.findOne({order:req.query.orderId})
            const orderMessages = await OrderMessage.find({chat:orderChat.id})
            return res.json({order,orderChat,orderMessages})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })

router.get('/deleteOrder',authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            if(user.role=='admin' || user.role=='master') {
                fileService.deleteFile(req.filepath+'/orders/'+req.query.UID)
            const order = await Order.findOneAndDelete({_id:req.query.UID})
            return res.json({order})
            }
            else
            {
                return res.status(500).json({message: "No authorizated req"})
            }
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })
router.get('/acceptOrder',authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            if(user.role=='admin' || user.role=='master') {
                const order1 = await Order.findOne({_id:req.query.id})
                let order;
                if (order1.master && order1.master!=null) {
                    console.log(order1.master)
                    console.log(req.user.id)
                    if (order1.master = req.user.id) {
                        console.log(1)
                        await Order.findOneAndUpdate({_id: req.query.id}, {
                            $set: {
                                master: null,
                                responsible: null,
                                status: null
                            }
                        })

                    } else {
                        console.log(2)
                        return res.status(500).json({message: "Заказ уже занят"})
                    }
                }
                else
                {
                    console.log(3)
                    await Order.findOneAndUpdate({_id: req.query.id}, {
                        $set: {
                            master: req.user.id,
                            responsible: user.name,
                            status:"в работе"
                        }
                    })
                }
                order = await Order.findOne({_id: req.query.id})
                return res.json({order})
            }
            else
            {
                return res.status(500).json({message: "No authorizated req"})
            }
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })

router.get('/allReadyOrder',authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            if(user.role=='admin' || user.role=='master') {
                const order1 = await Order.findOne({_id:req.query.id})
                let order;
                if (order1.master && order1.master!=null) {
                    if (order1.master = req.user.id) {
                        console.log(1)
                        if (order1.status=="в работе") {
                            await Order.findOneAndUpdate({_id: req.query.id}, {
                                $set: {
                                    status: "Готов к сдаче"
                                }
                            })
                        }
                        else
                        {
                            await Order.findOneAndUpdate({_id: req.query.id}, {
                                $set: {
                                    status: "в работе"
                                }
                            })
                        }


                    } else {
                        console.log(2)
                        return res.status(500).json({message: "Заказ уже занят"})
                    }
                }
                else
                {
                    return res.status(500).json({message: "Заказ ещё не в работе"})
                }
                order = await Order.findOne({_id: req.query.id})
                return res.json({order})
            }
            else
            {
                return res.status(500).json({message: "No authorizated req"})
            }
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
            const chat1 = await OrderChat.findOne({_id:req.body.chat})
            console.log(chat1)
            const message1 = await new OrderMessage({user:req.body.user, date:new Date(), order:req.body.order, message:req.body.message,chat:chat1,chek:false})
            await message1.save()
            console.log(222222222)
            console.log(req.body.chat)
            console.log(11111111)
            console.log(chat1)
            if (chat1.firstUser==req.body.user)
            {
                if(!req.body.order)
                    tgController.send(1759163276, 'нововедение в заказе ');
                await User.updateOne({_id: chat1.secondUser},{notice:'нововедение в заказе'})
                await OrderChat.updateOne({_id:chat1._id},{chekSecondUser:false})
            }

            else
            {
                await User.updateOne({_id: chat1.firstUser},{notice:'нововедение в заказе'})
                await OrderChat.updateOne({_id:chat1._id},{chekFirstUser:false})
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
                await OrderChat.updateOne({_id: req.query.chat}, {chekSecondUser: true})
                await OrderMessage.updateMany({chat: req.query.chat, user: chat.firstUser}, {chek: true})
            }
            else {
                console.log(chat.firstUser)
                await OrderChat.updateOne({_id: req.query.chat}, {chekFirstUser: true})
                await OrderMessage.updateMany({chat: req.query.chat, user: chat.secondUser}, {chek: true})
            }

            const Messages = await Message.find({chat:req.query.chat})
            return res.json({messages:Messages})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })


module.exports = router