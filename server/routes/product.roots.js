const Router = require('express')
const Product = require('../models/product.js')
const {check,validationResult} =require('express-validator')
const User = require("../models/user")
const fileService = require('../services/fileService')
const fileController = require('../controllers/fileController')
const authMiddleware = require('../middleware/auth.middleware')
const jwt = require("jsonwebtoken");
const config = require("config");
const router = new Router()

router.post('/upload', fileController.uploadFile)
router.post('/createProduct',
    [
        //check('name','Uncorrect name').isLength({min:3,max:100}),
        //check('type','Uncorrect type').isLength({min:3,max:100}),
        //check('mark','Uncorrect mark').isLength({min:3,max:100}),
        //check('price','Uncorrect price').isFloat,
    ],
    async (req,res)=>{
        try {
            console.log("aeaea1")
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:'Uncorrect request', errors})
            }
            //console.log(req.body)
            const {name, type, mark, price, shortDescription, description, images, privateComment,booked,background} =req.body
            const product = new Product({name, type, mark, price, shortDescription, description, images, privateComment,booked,background})
            await product.save()
            await fileService.createDir(req.filepath+'\\products\\'+product.id)

            return res.json({product})
        }catch (e){
            console.log(e)
            console.log("aeaeazzz")
        }
    })
router.post('/redactProduct',
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
            const newProd = await Product.updateOne({_id: req.body.UID},{$set:{name:req.body.name, type:req.body.type, mark:req.body.mark, price:req.body.price, shortDescription:req.body.shortDescription, description:req.body.description, imgs:req.body.imgs, privateComment:req.body.privateComment,background:req.body.background}})
            console.log(newProd)
            return res.json({message:"Product was redacted"})
        }catch (e){
            console.log(e)
        }
    })
router.post('/bookedProduct',
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
            const Prod = await Product.findOne({_id: req.body.UID})
            console.log(Prod)
            if (Prod.booked==true)
            {
                await Product.updateOne({_id: req.body.UID},{$set:{booked:false}})
                return res.json({message:"Продукт разбронирован"})
            }
            else
            {
                await Product.updateOne({_id: req.body.UID},{$set:{booked:true}})
                return res.json({message:"Продукт забронирован"})
            }

        }catch (e){
            console.log(e)
        }
    })
const ItemsPerPage=12
router.get('/getProducts',
    async (req, res) => {
        const page=req.query.currentPage || 1
        console.log('-------------------------------------------------')
        console.log(req.query)
        const user = req.query.user!=null & req.query.user ? await User.findOne({_id: jwt.decode(req.query.user).id}):''
        const minPrice=req.query.minPrice || 0.
        const maxPrice=req.query.maxPrice || 99999999999
        const priceFilter={$gte:minPrice,$lte:maxPrice}
        console.log(req.query.revers)
        const query={ $and: [{price:priceFilter,name:{$regex:req.query.name,$options:"i"},type:{$regex:req.query.type,$options:"i"},mark:{$regex:req.query.mark,$options:"i"}},{$or:[{name:{$regex:req.query.all,$options:"i"}},{type:{$regex:req.query.all,$options:"i"}},{mark:{$regex:req.query.all,$options:"i"}}]}]}
        try {

            const count = await Product.find(query).count()
            const pageCount = Math.ceil(count / ItemsPerPage)

            let skip;
            console.log(pageCount,page,count)
            if(req.query.revers==='true')
            {
                skip =((pageCount-page) * ItemsPerPage)-(ItemsPerPage-(count-((pageCount-1) * ItemsPerPage)))
            }
            else
            {skip =(page-1) * ItemsPerPage}
            console.log(skip)
            console.log((pageCount-page) * ItemsPerPage)
            console.log(ItemsPerPage+skip)
            let products
            if (user.role=='admin' || user.role=='master')
            products = await Product.find(query).skip(skip>=0?skip:0).limit(skip>=0?ItemsPerPage:ItemsPerPage+skip)
            else
                products= await Product.find(query, { privateComment: 0 }).skip(skip>=0?skip:0).limit(skip>=0?ItemsPerPage:ItemsPerPage+skip)
            return res.json({pagination:{count,pageCount},products})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })
router.get('/getProduct',
    async (req, res) => {
        try {
            const product = await Product.findOne({_id:req.query.id})
            return res.json({product})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })
router.get('/deleteProduct',authMiddleware,
    async (req, res) => {
        try {
            console.log(req.user.id);
            console.log(req.query.UID);
            const user = await User.findOne({_id: req.user.id})
            if(user.role=='admin' || user.role=='master') {

                fileService.deleteFile(req.filepath+'/products/'+req.query.UID)

                const product = await Product.findOneAndDelete({_id: req.query.UID})
                return res.json({product})
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