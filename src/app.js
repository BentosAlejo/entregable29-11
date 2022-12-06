const {ProductManager} = require('./ProductManager')

const newProduct = new ProductManager('./files/data.json')



const express = require('express')

const app = express()

app.get('/products', (request, response) => {
    const product = newProduct.getProducts()
    
    let limit = request.query.limit
    console.log(limit)
    if(limit){
        return response.send(product.slice(0, parseInt(limit)))
    }
    
    return response.send(product)
       
})  

app.get('/products/:id', (request, response) => {
    let id = request.params.id
    console.log(id)
    const productId = newProduct.getProductById(parseInt(id))
    return response.send(productId)
})

app.listen(8080, () => console.log('server runing...'))                                                                         