
const Product = require('../src/models/product')
const index = require('../src/index')
const { assert } = require('chai')
const supertest = require('supertest')
const nock = require('nock')

describe('Testes:', () => {
  it('Teste 1', () => {
    const body = {
      name: "teste-unitario",
      price: "120",
      amount: '165265456'
    }

    const result = new Product(body);
    assert.strictEqual(result.name, body.name);
    assert.strictEqual(result.price, Number.parseInt(body.price));
    assert.strictEqual(result.amount,Number.parseInt(body.amount));


  })

  it('Teste 2', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/products')
      .reply(201);
    supertest(index.server)
      .post('/products')
      .send({
        name: 'teste-p',
        price: '351',
        amount: '450',
      })
      
      
      .expect(201)
      .end(done)
  })

  it('Teste cachorro', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/products')
      .reply(201);
    supertest(index.server)
      .post('/products')
      .send({
        name: 'cachorro',
        price: '110.59',
        amount: '484654',
      })
      
      
      .expect(201)
      .end(done)
  })

  it('Teste gato', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/products')
      .reply(201);
    supertest(index.server)
      .post('/products')
      .send({
        name: 'gato',
        price: '568.5',
        amount: '604',
      })
      
      
      .expect(201)
      .end(done)
  })

  it('Teste galinha', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/products')
      .reply(201);
    supertest(index.server)
      .post('/products')
      .send({
        name: 'galinha',
        price: '284',
        amount: '1060',
      })
      
      
      .expect(201)
      .end(done)
  })

  it('Teste peixe', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/products')
      .reply(201);
    supertest(index.server)
      .post('/products')
      .send({
        name: 'peixe',
        price: '48',
        amount: '3145',
      })
      
      
      .expect(201)
      .end(done)
  })

  it('Teste macaco', (done) => {
    nock('https://mt-node-stock-api.glitch.me')
      .post('/products')
      .reply(201);
    supertest(index.server)
      .post('/products')
      .send({
        name: 'macaco',
        price: '755',
        amount: '157',
      })
      
      
      .expect(201)
      .end(done)
  })
  
  it('Teste 3', (done) => {
    supertest(index.server)
      .get('/products/teste-p')
      .expect(200)
      .end(done)
  })

  it('Teste da rota productNames - deve retornar lista completa de produtos existentes', (done) => {
    const resultadoEsperado = [
      { name: 'cachorro', price: 110.59 },
      { name: 'gato', price: 568.5 },
      { name: 'galinha', price: 284 },
      { name: 'teste-p', price: 351 },
      { name: 'macaco', price:755},
      { name: 'peixe', price:48}

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
