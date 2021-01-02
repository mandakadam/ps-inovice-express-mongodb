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
    address: {
        type: String,
        required: false,
        max: 1024,
    },
    gst: {
        type: String,
        required: false
    },
    contact: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('clients', ItemSchema);
