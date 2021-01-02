const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    client_id: {
        type: String,
        required: true,
        max: 255,
    },
    name: {
        type: String,
        required: true,
        max: 255,
        min: 2
    },
    invoiceDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    items: {
        type: Array,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
    inWords:{
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    statusText: {
        type: String,
        required: true,
    },

});



module.exports = mongoose.model('client_details', ItemSchema);
