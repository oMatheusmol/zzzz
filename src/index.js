const express = require('express')
require('./db/mongoose')
const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post("/products", (req, res) => {
  const prod = new Product(req.body)
  let num = prod.amount
  let pack =0
  while(num>1000){
    num -= 1000
    pack ++
  } 
  prod.amount = num
  prod.packs = pack

  prod.save().then(() => {
    res.send(prod)
  }).catch(e => {
    console.log(e)
  })
  res.status(201).send(prod)
})

app.get("/products", (req, res) => {
  Product.find({}).then(prod => {
    res.send(prod)
  }).catch(e => {
    res.status(500).send()
  })
})

app.get("/productsNames", (req, res) => {
  Product.find({}).then(prods => {
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

app.get("/products/:name", (req, res) => {
  let product;
  Product.find({}).then(prod => {
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

app.delete("/products/:id", async (req, res) => { //Deleta pelo id e nao pelo nome
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

const server = app.listen(port, () => {
  console.log("Listening on port %s", server.address().port);
  console.log('http://localhost:%s', server.address().port)
})

const buildProduct = (body) => {  
  return {
    name: body.name,
    price: Number(body.price, 10),
    amount: body.amount,
    packs: body.packs
  }
}

module.exports = {buildProduct, server}