
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
    }
})

const cachorro = new Product({   
    name: 'cachorro', price: 110.59, amount: 484654
})
const gato = new Product({  
    name: 'gato', price: 568.5, amount: 604
})

const galinha = new Product({  
    name: 'galinha', price: 284, amount: 1060 
})
const peixe = new Product({  
    name: 'peixe', price: 48, amount: 3145 
})
const macaco = new Product({  
    name: 'macaco', price: 755, amount: 157 
})


cachorro.save().catch(e =>{
    return 'Error'
})
gato.save().catch(e =>{
    return 'Error'
})
galinha.save().catch(e =>{
    return 'Error'
})
peixe.save().catch(e =>{
    return 'Error'
})
macaco.save().catch(e =>{
    return 'Error'
})



module.exports = Product