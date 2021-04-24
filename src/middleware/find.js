const Product = require('../models/product')

const findAll = async (req, res, next) => {
    try {
        await Product.find({}).then(prod => {
            req.session = prod
          }).catch(e => {
            res.status(500).send()
          })

        next()

    } catch (e) {
        res.status(401).send({ error: 'Error.' })
    }
}

const findOne = async (req, res, next) => {
  try {
      const prod = await Product.findOne(req.params)
      
      if(!prod){
          throw new Error()
      
      }
      req.prod = prod

      next()

  } catch (e) {
      res.status(401).send({ error: 'Error.' })
  }
}


module.exports = {findOne,findAll}