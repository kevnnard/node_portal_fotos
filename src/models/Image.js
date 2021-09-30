const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
    sku: {type: String},
    title: {type: String},
    description: {type: String},
    filename: {type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: { type: Number},
    imageUrl: {type: String},
    public_id: {type: String},
    created_at: {type: Date, default: Date.now()}
});

module.exports = model('Image', imageSchema);