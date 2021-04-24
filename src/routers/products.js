const express = require('express')
const router = new express.Router()
const Product = require('../models/product')
const {findOne,findAll} = require('../middleware/findProd')
const {auth,createProd} = require('../middleware/auth')

router.post("/products", createProd, async (req, res) => {
  res.status(200).send()
})

router.get("/products", findAll, async (req, res) => {
  res.status(200).send(req.session)
})

router.get("/productsNames", findAll, async (req, res) => {
  try {
    let prods = await req.session
    prods.sort((a, b) => a.price - b.price)
    let newarr = []
    for (let prod in prods) {
      newarr.push((prods[prod].name))
    }
    res.status(200).send(newarr)
  } catch {
    res.status(500).send()
  }
})

router.get("/products/:name", findOne, async (req, res) => {
  res.status(200).send(req.prod)
})

router.delete("/products/:name", findOne, async (req, res) => {
    await Product.deleteOne(req.prod)
    res.send('Product deleted!')
})

router.patch('/products/:name', findOne, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdates= ['name','price','amount']
    const isValidOperation = updates.every((update)=> allowUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send( {error: 'Invalid updates!'})
    }

    try{
        updates.forEach(update => req.prod[update] = req.body[update])
        await req.prod.save()
        auth(req.prod)
        res.send(req.prod)
        next()
    }catch(e){
        res.status(400).send()
    }
})

module.exports = router
