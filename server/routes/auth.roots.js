const Router = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const config = require("config")
const jwt = require("jsonwebtoken")
const {check,validationResult} =require('express-validator')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const Chat = require("../models/chat")

const fileService = require("../services/fileService");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,// Здесь можно указать другой почтовый сервис
    auth: {
        user: "master43dotru@mail.ru", // Замените на свою почту
        pass: "9Nnt6ABqvUrLzncnQMS5" // Замените на свой пароль
    }
});

router.post('/registration',
    [
        check('email','Uncorrect email').isEmail(),
        check('password','Password must be longer than 3 and shorter than 12').isLength({min:3,max:12})
    ],
    async (req,res)=>{
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message:'Uncorrect request', errors})
        }

        const {email, password} =req.body
        console.log(email,password)
        const candidate = await User.findOne({email})
        if(candidate) {
            if(candidate.confirmed==true) {
                return res.status(400).json({message: 'Пользователь с такой почтой '+email+' уже существует'})
            }
            else
                await User.deleteOne({email})
        }
        const hashPassword =await bcrypt.hash(password, 15)
        const newUser = new User({email,password: hashPassword,role:"client",name:email,notice:'Вы успешно зарегистрированны',confirmed:false,telegram:null})
        await newUser.save()
        const token = jwt.sign({id: newUser.id}, config.get("secretKey"), {expiresIn: "2h"})
        console.log('===========================================')
        console.log('https://master43.ru:443/confirm/' + token )
        console.log('-------------------------------------------')
        const mailOptions = {
            from: 'master43dotru@mail.ru',
            to: email,
            subject: 'Подтверждение регистрации',
            html: '<div style="display: flex; flex-direction:column; width:100%; jucify-content:center; align-items: center; font-family: "MailSans";  font-size: 2vw; font-weight: bold; "> Пожалуйста, подтвердите ваш аккаунт. <a style="margin-top: 2%; border: 1px solid; padding: 10px; border-radius: 5px; text-decoration: none;" href="https://master43.ru:443/confirm/' + token + '">Ссылка для подтверждения</a></div>'
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Письмо успешно отправлено: ' + info.response);
            }
        });
        return res.json({message: 'Отправленно подтверждение на почту '+email})
    }catch (e){
        console.log(e)
    }
})
router.post('/confirm',
    async (req,res)=>{
        try {
            console.log(req.body)
            console.log('1')
            const {id} =req.body
            console.log(id)
            console.log(config.get('secretKey'))
            console.log('2')
            let id1=jwt.verify(id, config.get('secretKey'))
            console.log(id1)
            console.log('3')
            const candidate = await User.findOneAndUpdate({_id:id1.id},{$set:{confirmed:true}})
            if(candidate) {
                if(candidate.confirmed==true) {
                    return res.json({
                        token:id,
                        user: {
                            id: candidate.id,
                            email: candidate.email,
                            role: candidate.role,
                            avatar: candidate.avatar
                        }
                    })
                }
                if(candidate.confirmed==false) {
                    await fileService.createDir(req.filepath+'/orders/'+candidate.id)
                    const sUser = await User.findOne({_id:'647abf547718cac675e1aaaf'})
                    const chat = new Chat({firstUser:candidate.id,secondUser:'647abf547718cac675e1aaaf',firstUserName:candidate.name,secondUserName:sUser.name,messages:[],notice:'Поздравляем вы зарегестрированны'})
                    await chat.save()

                    //const fUser = await User.findOneAndUpdate({_id:candidate.id},{$set:{confirmed:true}})

                    console.log(candidate)
                    console.log(id)
                    return res.json({
                        token:id,
                        user: {
                            id: candidate.id,
                            email: candidate.email,
                            role: candidate.role,
                            avatar: candidate.avatar,
                            telegram: candidate.telegram
                        }
                    })
                }
            }



        }catch (e){
            console.log(e)
            return res.status(400).json({message: "Срок действия ссылки истёк"})
        }
    })

router.post('/login',
    async (req,res)=>{
        try {

            const {email, password} = req.body
            console.log(email,password)
            const user = await User.findOne({email})
            if (!user) {
                console.log("Пользователь не зарегестрирован")
                return res.status(404).json({message: "Пользователь не зарегестрирован"})
            }
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                console.log("Не верный пароль")
                return res.status(400).json({message: "Не верный пароль"})
            }
            if (user.confirmed==false) {
                console.log("Не подтверждённая почта")
                return res.status(400).json({message: "Почта не подтвреждена"})
            }
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            console.log(token, user.id, user.email, user.role, user.avatar)
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                    phone: user.phone,
                    name: user.name,
                    telegram: user.telegram
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                    phone: user.phone,
                    name: user.name
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.get('/addMaster', authMiddleware,
    async (req, res) => {
        try {
            console.log(req.user)
            console.log('zzzzzzzzzz')
            const user = await User.findOne({_id: req.user.id})
            if (user.role="admin")
            {
                console.log("=======aaaa====")
                let user1=await User.findOne({name: "artem.novickov@mail.ru"});
                let user2=await User.findOneAndUpdate({email: req.query.email},{$set:{role:req.query.role}})
                console.log(user2)
                if (user2!=null)
                return res.status(400).json({message: req.query.role+" создан"})
                else
                    return res.status(400).json({message:"пользователь "+ req.query.email +" небыл найден"})
            }
            else {
                console.log("=======bbbb===")
                return res.status(500).json({message: "Вы не администратор"})
            }
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.get('/getNotice', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            if (user) {
                let notice = user.notice
                if (notice != '') {
                    //console.log(req.user)
                    setTimeout(async () => {
                        await User.updateOne({_id: req.user.id}, {notice: ''})
                    }, 4000);
                    return res.json({
                        notice
                    })
                } else
                    return res.json({
                        notice: ''
                    })
            }
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })


router.post('/ChangeAcc',
    async (req, res) => {
        try {
            console.log(req.body.password)
            if (req.body.password=="******" || req.body.password=="*****" || req.body.password=="****" || req.body.password=="***" || req.body.password=="**" || req.body.password=="*" || req.body.password=="")
            {console.log(1)
                await User.updateOne({_id: jwt.decode(req.body.Firsttoken).id},{$set: {email : req.body.email, phone:req.body.phone, name: req.body.name,telegram:req.body.telegram}})}
            else
            {
                console.log(2)
                await User.updateOne({_id: jwt.decode(req.body.Firsttoken).id},{$set: {email : req.body.email,password: await bcrypt.hash(req.body.password, 15), phone:req.body.phone, name: req.body.name, telegram:req.body.telegram}})
            }
            const user = await User.findOne({_id: jwt.decode(req.body.Firsttoken).id})
            console.log(user,jwt.decode(req.body.Firsttoken).id)
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            console.log(token, user.id, user.email, user.role, user.avatar)
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                    phone: user.phone,
                    name: user.name,
                    telegram: user.telegram
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })
module.exports = router