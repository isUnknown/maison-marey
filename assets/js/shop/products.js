import { Data } from '../libraries/app.js'

const productsUrl = `${document.body.dataset.rootUrl}/products`
fetch(productsUrl).then(res => {
    return res.json()
}).then(products => {
    console.log(products)
    const App = new Vue({
        el: '#app',
        data: {
            products: products
        },
        methods: {
            toNbr: function() {
                this.products.forEach(product => {
                    product.inputQuantity = parseInt(product.inputQuantity)
                    product.selectedQuantity = parseInt(product.selectedQuantity)
                    product.remainingQuantity = parseInt(product.remainingQuantity)
                    product.totalPrice = parseInt(product.totalPrice)
                    product.unitPrice = parseInt(product.unitPrice)
                })
            },
            addToCart: function(product) {
                this.toNbr()
                product.selectedQuantity += product.inputQuantity
                product.remainingQuantity -= product.inputQuantity
                if (product.remainingQuantity > 0) {
                    product.inputQuantity = 1
                } else {
                    product.inputQuantity = 0
                }

                product.totalPrice = product.selectedQuantity * product.unitPrice
            }
        }
    })
})