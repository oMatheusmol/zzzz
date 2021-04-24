const express = require('express')
require('./db/mongoose')
const Product = require('./models/product')
const prodRouter = require('./routers/products')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(prodRouter)

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