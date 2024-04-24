const mongoose = require("mongoose")

const slug = require("mongoose-slug-updater")
mongoose.plugin(slug)

const productSchema = new mongoose.Schema(
    {
        title: String,
        price: Number,
        deleted:{
            type: Boolean,
            default: false
        },
        status: String,
        rank: Number,
        thumbnail: String,  
        slug:{
            type: String,
            slug:"title",
            unique: true //ngau nhien slug
        },
        deletedAt: Date
    }, {
        timestamps: true

    }
)

const Product = mongoose.model('Product', productSchema, "products")

module.exports = Product