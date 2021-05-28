export class Shop {

    static init(productSelector, cartSelector) {
        let stock = this.getStock(productSelector, cartSelector)
        let cart = new Map()
        
        for(const [id, item] of stock) {
            item.addToCartBtn.addEventListener('click', () => {
                console.log(item)
            })
        }
    }

    static getStock(productSelector, cartSelector) {
        const stock = new Map()
        
        document.querySelectorAll(productSelector).forEach(product => {
            const id = product.dataset.id
            const data = {
                id: id,
                container: product,
                addToCartBtn: product.querySelector('.addToCart'),
                title: product.dataset.title,
                author: product.dataset.author,
                maxQuantity: parseInt(product.dataset.quantity),
                remainingQuantity: parseInt(product.dataset.quantity),
                unitPrice: parseInt(product.dataset.price)
            }
            const item = new Product(data)
            
            stock.set(id, item)
        })
        
        return stock
    }

    static add(cart, id, data) {

    }
}

class Product {
    constructor(data) {
        this.id = data.id
        this.container = data.container
        this.addToCartBtn = data.addToCartBtn
        this.title = data.title
        this.author = data.author
        this.maxQuantity = data.maxQuantity
        this.remainingQuantity = data.remainingQuantity
        this.unitPrice = data.unitPrice
    }
}

class Cart {

}