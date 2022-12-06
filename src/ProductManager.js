
const fs = require('fs')

class ProductManager {

    constructor(path) {
        this.path = path
        fs.writeFileSync(this.path, JSON.stringify([
            
                {
                    "id": 1,
                    "title": "Mi Producto",
                    "description": "Mi description",
                    "price": 200,
                    "thumbnail": "www.google.com",
                    "code": 2505,
                    "stock": 20
                },
                {
                    "id": 2,
                    "title": "yes",
                    "description": "no",
                    "price": 20000000,
                    "thumbnail": "www.google.com",
                    "code": 2599,
                    "stock": 209
                }
            
        ]))


    }

    getProducts = () => { return this.readFile() }

    getProductById(id) {
        const objs = this.getProducts();
        const wanted = objs.find(o => o.id === id);
        return wanted ? wanted : new Error('Not found');
    }

    getNextId = () => {
        const count = this.getProducts().length
        if (count > 0) {
            const lastProduct = this.getProducts()[count - 1]
            const id = lastProduct.id + 1
            return id
        } else {
            return 1
        }
    }
    isValidProduct(product){
        if(
          !product.title ||
          !product.description ||
          !product.price ||
          !product.thumbnail || 
          !product.code ||
          !product.stock
        ) return false
        return true;
      }
    getProductByCode(code){
        const products = this.getProducts();
        const exists = products.find(p => p.code === code);
        return exists ? exists : false;
      }
    readFile = () => {

        const contentStr = fs.readFileSync(this.path, 'utf-8')
        const contentObj = JSON.parse(contentStr)
        return contentObj
    }
    saveFile = (obj) => {
        fs.writeFileSync(this.path, JSON.stringify(obj))
    }
    deleteProduct =(id) =>{
        const object = this.getProductById(id) 
        let products = this.getProducts()
        products = products.filter(e => e.id !== id)
        this.saveFile(products)
        console.log('Deleted')
    }
    updateProduct = (id, obj) =>{
        let object = this.getProductById(id)
        object = {...object, ...obj}
        let products = this.getProducts()
        products = products.map(p => p.id === id ? object : p)
        this.saveFile(products)
        console.log('updated')
    }
    addProducts = (product) => {
        if (this.getProductByCode(product.code)) throw new Error('Product with this code already exists'); // SI EXISTE UN PRODUCTO CON CODIGO, LANZO ERROR
        if (!this.isValidProduct(product)) throw new Error('Fields missing');
        const newProduct = {
            ...product,
            id: this.getNextId(),
        }
        let products = this.getProducts()
        products.push(newProduct);
        this.saveFile(products)
    }
}

module.exports = {ProductManager}