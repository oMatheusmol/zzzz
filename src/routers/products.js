const express = require('express')
const router = new express.Router()
const Product = require('../models/product')
const auth = require('../middleware/auth')

router.post("/products", auth, async(req, res) => {
    res.status(200).send()
  })
  
  router.get("/products", async(req, res) => {
    await Product.find({}).then(prod => {
      res.send(prod)
    }).catch(e => {
      res.status(500).send()
    })
  })
  
  router.get("/productsNames", async(req, res) => {
    await Product.find({}).then(prods => {
      prods.sort((a, b) => a.price - b.price)
      let newarr = []
      for (let prod in prods) {
        newarr.push((prods[prod].name))
      }
      res.status(200).send(newarr)
    }).catch(e => {
      res.status(500).send()
    })
  })
  
  router.get("/products/:name", async(req, res) => {
    let product;
    await Product.find({}).then(prod => {
      prod.forEach(element => {
        if (element.name === req.params.name) {
          product = element;
        }
      })
      res.status(200).send(product)
    }).catch(e => {
      res.status(500).send()
    })
  })
  
  router.delete("/products/:id", async (req, res) => { //Deleta pelo id e nao pelo nome
    try {
      const prod = await Product.findByIdAndDelete(req.params.id)
      if (!prod) {
        return res.status(404).send()
      }
      res.send(prod)
    } catch (e) {
      res.status(500).send()
    }
  })

module.exports = router
