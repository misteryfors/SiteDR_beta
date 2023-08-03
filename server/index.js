const fs = require('fs');
const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
var http = require('http');
var https = require('https');
const fileUpload = require("express-fileupload")
const authRouter = require("./routes/auth.roots")
const prodRouter = require("./routes/product.roots")
const chatRouter = require("./routes/chat.roots")
const orderRouter = require("./routes/order.roots")
const reviewRouter = require("./routes/review.root")
const priceListRouter = require("./routes/priceList.roots")
const app = express()
const PORT = config.get('serverPort')
const corsMiddleware = require('./middleware/cors.middleware')
const pathMiddleware = require('./middleware/path.middleware')
const path=require('path')
const tgController = require('./controllers/telegramController.js')
tgController.on()

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(pathMiddleware(path.resolve(__dirname,'imgs')))
app.use(express.json(express.json()))
app.use(express.static('imgs'))
app.use("/api/auth",authRouter)
app.use("/api/prod",prodRouter)
app.use("/api/order",orderRouter)
app.use("/api/chat",chatRouter)
app.use("/api/revw",reviewRouter)
app.use("/api/list",priceListRouter)    

const host = '127.0.0.1';
const port = 8443;

http
    .createServer(
        {
            key: fs.readFileSync('../cert/your_domain.key.txt'),
            cert: fs.readFileSync('../cert/certificate.csr'),
        },
        app
    )
    .listen(port, host, function () {
        console.log(`Server listens https://${host}:${port}`);
    });

const start = async () => {
    try{
        await mongoose.set('strictQuery', true);
        await mongoose.connect(config.get('URL'))
        app.listen(PORT, () => {
            console.log('Server start on Port ',PORT);
        })
    } catch (e){
        return e
    }
}
start()