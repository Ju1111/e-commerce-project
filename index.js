const express = require('express')
const db = require('./models')

const app = express()
const port = process.env.PORT || 4001

const { Product } = db

app.listen(port, () => {
  console.log(`
    Server is listening on ${port}.

    Open http://localhost:${port}

    to see the app in your browser.
  `)
})


app.use(function(request, response, next) {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

app.get('/products', (request, response) => {
  const products = Product
  .findAll()
  .then((products) => {
    response.json(products)
  })
  .catch((err) => {
    console.error(err)
    response.status(500)
    response.json({ message : 'Oops! There was an error getting the products. Please try again.'})
  })
})

app.get('/products(:id)', (request, response) => {
  const products = Product
  .findById(request.params.id)
  .then((product) => {
    if (product) {
      response.json(product)
    }
    else  {
    response.status(404)
    response.json({ message: 'Product not found!'})
    }
  })
  .catch((err) => {
    console.error(err)
    response.status(500)
    response.json({ message : 'Oops! There was an error getting the products. Please try again.'})
  })
})

Product.findById(1).then(product => console.log(JSON.stringify(product)))
