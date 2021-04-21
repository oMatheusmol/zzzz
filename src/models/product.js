
const mongoose = require('mongoose')
const validate = require('validator')

const Product = mongoose.model('Product',{
    name:{
        type:String,
        require:true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    price:{
        type:Number,
        require:true,
        trim: true,
        validate(value) {
            if (!Number(value) || value<1) {
                throw new Error('Amount must be number greater than 1!')
            }
        }
    },
    amount:{
        type:Number,
        require:true,
        trim: true,
        validate(value) {
            if (!Number(value)|| value<0) {
                throw new Error('Price must be a possitive number!')
            }
        }
    },
    packs: {
        type:Number
    }
})

module.exports = Product