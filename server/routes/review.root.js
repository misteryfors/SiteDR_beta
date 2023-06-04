const Router = require('express')
const Review = require('../models/review')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const config = require("config")
const jwt = require("jsonwebtoken")
const {check,validationResult} =require('express-validator')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const Product = require("../models/product.js");
const {ObjectId} = require("mongoose");
const fileService = require("../services/fileService");

router.post('/createReview',authMiddleware,
    async (req,res)=>{
        try {
            const user = await User.findOne({_id: req.user.id})
            const newReview = new Review({userName:user.name,liked:req.body.liked, date:new Date(), deleted:false, review:req.body.review})
            await newReview.save()
            return res.json({
                review:newReview
            })
        }catch (e){
            console.log(e)
        }
    })
const ItemsPerPage=12
router.get('/getReviews',authMiddleware,
    async (req, res) => {
        try {
            const page=req.query.currentPage || 1
            const count = await Review.find({}).count()
            const pageCount = Math.ceil(count / ItemsPerPage)

            let skip;
            console.log(pageCount,page,count)
            if(req.query.revers==='true')
            {
                skip =((pageCount-page) * ItemsPerPage)-(ItemsPerPage-(count-((pageCount-1) * ItemsPerPage)))
            }
            else
            {skip =(page-1) * ItemsPerPage}
            let reviews
            if (user.role=='admin')
                reviews = await Review.find({}).skip(skip>=0?skip:0).limit(skip>=0?ItemsPerPage:ItemsPerPage+skip)
            else
                reviews= await Review.find({ deleted: false }).skip(skip>=0?skip:0).limit(skip>=0?ItemsPerPage:ItemsPerPage+skip)
            return res.json({pagination:{count,pageCount},reviews})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })
router.get('/deleteReview',authMiddleware,
    async (req, res) => {
        try {
            console.log(req.user.id);
            console.log(req.query.UID);
            const user = await User.findOne({_id: req.user.id})
            if(user.role=='admin') {
                const review = await Review.findOneAndUpdate({_id: req.query.UID},{$set:{deleted:true}})
                return res.json({review})
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

module.exports = router