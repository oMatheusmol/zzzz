
const Product = require('../src/models/product')
const index = require('../src/index')
const { assert } = require('chai')
const supertest = require('supertest')
const nock = require('nock')

describe('Testes:', () => {
  it('Teste-unitario', () => {
    const body = {
      name: "teste-unitario",
      price: "120",
      amount: '159'
    }
    const result = new Product(body);
    assert.strictEqual(result.name, body.name);
    assert.strictEqual(result.price, Number.parseInt(body.price));
    assert.strictEqual(result.amount,Number.parseInt(body.amount));
  })

  it('Post teste-p', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/products')
      .reply(200);
    supertest(index.server)
      .post('/products')
      .send({
        name: 'teste-p',
        price: '351',
        amount: '450',
      })   
      .expect(200)
      .end(done)
  })

  it('Get /products/teste-p', (done) => {
    supertest(index.server)
      .get('/products/teste-p')
      .expect(200)
      .end(done)
  })

  it('Post cachorro', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/products')
      .reply(200);
    supertest(index.server)
      .post('/products')
      .send({
        name: 'cachorro',
        price: '110.59',
        amount: '484654',
      })
      .expect(200)
      .end(done)
  })

  it('Post gato', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/products')
      .reply(200);
    supertest(index.server)
      .post('/products')
      .send({
        name: 'gato',
        price: '568.5',
        amount: '604',
      })
      .expect(200)
      .end(done)
  })

  it('Post galinha', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/products')
      .reply(200);
    supertest(index.server)
      .post('/products')
      .send({
        name: 'galinha',
        price: '284',
        amount: '1060',
      })     
      .expect(200)
      .end(done)
  })

  it('Post peixe', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/products')
      .reply(200);
    supertest(index.server)
      .post('/products')
      .send({
        name: 'peixe',
        price: '48',
        amount: '3145',
      })
      .expect(200)
      .end(done)
  })

  it('Post macaco', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/products')
      .reply(200);
    supertest(index.server)
      .post('/products')
      .send({
        name: 'macaco',
        price: '755',
        amount: '157',
      })
      .expect(200)
      .end(done)
  })
  

  it('Patch peixe para vaca', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/products')
      .reply(200);
    supertest(index.server)
      .patch('/products/peixe')
      .send({
        name: 'vaca',
        price: '75',
        amount: '7',
      })
      .expect(200)
      .end(done)
  })

  it('Patch macaco para leao', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/products')
      .reply(200);
    supertest(index.server)
      .patch('/products/macaco')
      .send({
        name: 'leao',
        price: '1000',
        amount: '42',
      })
      .expect(200)
      .end(done)
  })

  it('Get /products/vaca', (done) => {
    supertest(index.server)
      .get('/products/vaca')
      .expect(200)
      .end(done)
  })

  it('Get /products/leao', (done) => {
    supertest(index.server)
      .get('/products/leao')
      .expect(200)
      .end(done)
  })

  it('Delete teste-p', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/products')
      .reply(200);
    supertest(index.server)
      .delete('/products/teste-p')
      .send()
      .expect(200)
      .end(done)
  })

  it('Teste da rota productNames', (done) => {
    const resultadoEsperado = [
      { name: 'cachorro', price: 110.59 },
      { name: 'gato', price: 568.5 },
      { name: 'galinha', price: 284 },
      { name: 'leao', price:1000},
      { name: 'vaca', price:75}

    ]
    resultadoEsperado.sort((a, b) => a.price - b.price)
    let newarr = []
    for (let prod in resultadoEsperado) {
      newarr.push(resultadoEsperado[prod].name)
    }
    supertest(index.server)
      .get('/productsNames')
      .expect(200, newarr)
      .end(done)
  })
})
