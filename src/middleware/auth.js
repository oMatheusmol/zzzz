const Product = require('../models/product')

const auth = async (req, res, next) => {
    try {

        const prod = await new Product(req.body)
        const price = Number(prod.price)
        let num = prod.amount
        let pack = 0
        if (!price || price < 0) return new Error('Error')
        if (!num || num < -1) return new Error('Error')

        while (num > 1000) {
            num -= 1000
            pack++
        }
        prod.amount = num
        prod.packs = pack
        prod.save().then(() => {
            res.send(prod)
        }).catch(e => {
            console.log(e)
        })

        next()

    } catch (e) {
        res.status(401).send({ error: 'Error.' })
    }
}

module.exports = auth