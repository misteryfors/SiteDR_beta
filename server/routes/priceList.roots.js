const Router = require('express')
const PriceList = require('../models/priceList')
const {check,validationResult} =require('express-validator')
const User = require("../models/user")
const fileService = require('../services/fileService')
const fileController = require('../controllers/fileController')
const authMiddleware = require('../middleware/auth.middleware')
const jwt = require("jsonwebtoken");
const config = require("config");
const router = new Router()

router.post('/upload', fileController.uploadFile)
router.post('/createPricelist',
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
            const {name, img} =req.body
            const List = new PriceList({name, img:'',serviceName:[],price:[]})
            await List.save()
            await fileService.createDir(req.filepath+'\\PriceList\\'+List.id)

            return res.json({List})
        }catch (e){
            console.log(e)
            console.log("aeaeazzz")
        }
    })
router.post('/addService',
    [
        // Validation middleware here if needed
    ],
    async (req, res) => {
        try {
            console.log("aeaea1")
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Uncorrect request', errors })
            }

            const { UID, newService, newPrice } = req.body;

            // Find the document with the given id
            const priceList = await PriceList.findById(UID);

            if (!priceList) {
                return res.status(404).json({ message: 'Price list not found' });
            }

            // Push the new service and price to the services array
            priceList.services.push({ serviceName: newService, price: newPrice });

            // Save the updated document back to the database
            await priceList.save();

            return res.json(priceList); // You can return the updated priceList if needed
        } catch (e) {
            console.log(e);
            console.log("aeaeazzz");
            return res.status(500).json({ message: 'Server error' });
        }
    });

router.post('/redactList', async (req, res) => {
    try {
        const { UID, newlist } = req.body;

        // Проверьте, что newlist содержит правильные данные
        // Возможно, вам нужно добавить дополнительную валидацию на сервере

        // Обновите документ с указанным UID
        console.log(newlist)
        const updatedPriceList = await PriceList.findOneAndUpdate(
            { _id: UID },
            newlist,
            { new: true } // Вернуть обновленный документ
        );

        if (!updatedPriceList) {
            return res.status(404).json({ message: 'Price list not found' });
        }

        return res.json({ message: 'Price list successfully updated' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Server error' });
    }
});
router.get('/getPricelist',
    async (req, res) => {
        try {
            const product = await PriceList.find({})
            return res.json({product})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })
router.get('/deletePricelist',authMiddleware,
    async (req, res) => {
        try {
            console.log(req.user.id);
            console.log(req.query.UID);
            const user = await User.findOne({_id: req.user.id})
            if(user.role=='admin' || user.role=='master') {

                fileService.deleteFile(req.filepath+'/PriceList/'+req.query.UID)

                const product = await PriceList.findOneAndDelete({_id: req.query.UID})
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
router.get('/deleteService', authMiddleware, async (req, res) => {
    try {
        console.log(req.user.id);
        console.log(req.query.UID);
        const user = await User.findOne({ _id: req.user.id })
        if (user.role === 'admin' || user.role === 'master') {
            const product = await PriceList.findOneAndUpdate(
                { _id: req.query.list },
                { $pull: { services: { _id: req.query.service } } },
                { new: true } // Return the updated document
            );

            return res.json({ product });
        } else {
            return res.status(500).json({ message: "No authorized req" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Can not get files" });
    }
});


module.exports = router