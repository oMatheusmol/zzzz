const express = require('express')
require('./db/mongoose')
const prodRouter = require('./routers/products')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(prodRouter)

const server = app.listen(port, () => {
  console.log("Listening on port %s", server.address().port);
  console.log('http://localhost:%s', server.address().port)
})

module.exports = {server}