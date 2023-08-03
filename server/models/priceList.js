const { Schema, model } = require("mongoose");

const ServicePrice = new Schema({
    serviceName: { type: String },
    price: { type: String }
});

const PriceList = new Schema({
    name: { type: String },
    img: { type: String },
    services: [ServicePrice] // Массив объектов с полями serviceName и price
});

module.exports = model('PriceList', PriceList);