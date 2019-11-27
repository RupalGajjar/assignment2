var mongoose = require('mongoose');

var AdvertisementSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
    }
);

module.exports = mongoose.model('db', AdvertisementSchema);