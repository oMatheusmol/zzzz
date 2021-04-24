const auth = (prod)=>{
    try {
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

    } catch (e) {
        res.status(401).send({ error: 'Error.' })
    }

}

module.exports = {auth}
