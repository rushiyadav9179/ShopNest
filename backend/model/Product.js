const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            required: true
        },
        imageUrls: {
            type: [String],
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        rating: {
            type: Number,
            default: 0
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        }
    },
);

module.exports = mongoose.model('Product', productSchema);
