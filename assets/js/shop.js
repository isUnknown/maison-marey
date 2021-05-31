import { Data } from './libraries/app.js'

const productsUrl = `${document.body.dataset.rootUrl}/products`
fetch(productsUrl).then(res => {
    return res.json()
}).then(products => {
    const vm = new Vue({
        el: '#app',
        data: {
            products: products,
            cart: {
                isOpen: false,
                products: []
            },
            filters: {},
            activeFilters: []
        },
        computed: {
            totalQuantity: function () {
                let totalQuantity = 0
                this.cart.products.forEach(product => {
                    totalQuantity += product.quantity
                })
                return totalQuantity
            },
            totalPrice: function() {
                let totalPrice = 0
                this.cart.products.forEach(product => {
                    const selectionPrice = this.getSelectionPrice(product)
                    totalPrice += selectionPrice
                })
                return totalPrice
            },
            filteredProducts: function() {
                let filteredProduct = this.products.filter(product => {
                    this.activeFilters.forEach(activeFilter => {

                    })
                })
            }
        },
        methods: {
            addToCart: function(product) {
                this.showCart()

                let newProduct = {}
                newProduct.id = product.id
                newProduct.name = product.name
                newProduct.author = product.author
                newProduct.cover = product.cover
                newProduct.price = product.price
                newProduct.quantity = product.inputQuantity

                if(this.isInCart(product)) {
                    this.updateCart(product)
                } else {
                    this.cart.products.push(newProduct)
                }

                product.inputQuantity = 1
            },
            updateCart: function(product) {
                let cartProduct = this.getCartProduct(product)
                cartProduct.quantity += product.inputQuantity
            },
            showCart: function() {
                this.cart.isOpen = true
            },
            toggleCart: function() {
                this.cart.isOpen = !this.cart.isOpen
            },
            getRemainingQuantity: function(product) {
                if (this.isInCart(product)) {
                    let cartProduct = this.getCartProduct(product)
                    let remainingQuantity = product.quantity - cartProduct.quantity
                    return remainingQuantity
                } else {
                    return product.quantity
                }
            },
            getSelectionPrice: function(product) {
                let selectionPrice = product.quantity * product.price
                return selectionPrice
            },
            getCartProduct: function(product) {
                let cartProduct = this.cart.products.filter(cartProduct => cartProduct.id === product.id)
                return cartProduct[0]
            },
            isInCart: function(product) {
                return this.cart.products.some(cartProduct => cartProduct.id === product.id)
            },
            parseToNumber: function() {
                this.products.forEach(product => {
                    product.inputQuantity = parseInt(product.inputQuantity)
                    // product.selectedQuantity = parseInt(product.selectedQuantity)
                    product.quantity = parseInt(product.quantity)
                    product.price = parseInt(product.price)
                })
            },
            saveCart: function() {
                let jsonCart = JSON.stringify(this.cart)
                sessionStorage.setItem('cart', jsonCart)
            },
            getCart: function() {
                let cart = JSON.parse(sessionStorage.getItem('cart'))
            },
            cleanCart: function() {
                this.cart.products = []
            },
            toggleFilter: function(filter) {
                filter.isOpen = !filter.isOpen
            },
            activeFilter: function(filter, tag) {
                let newFilter = {
                    name: filter,
                    value: tag
                }
                if (this.activeFilters.some(activeFilter => activeFilter.name === newFilter.name)) {
                    let target = this.activeFilters.filter(activeFilter => activeFilter.name === newFilter.name)
                    target[0].value = newFilter.value
                } else {
                    this.activeFilters.push(newFilter)
                }
                console.log(this.activeFilters)
            },
            getActiveTags: function() {
                let activeTags = []
                this.activeFilters.forEach(activeFilter => {
                    activeTags.push(activeFilter.value)
                })
                return activeTags
            }
        },
        updated: function() {
            this.parseToNumber()
            this.saveCart()
        },
        mounted: function() {
            if (sessionStorage.getItem('cart')) {
                this.cart = JSON.parse(sessionStorage.getItem('cart'))
            }
        },
        created: function() {
            let filters = {
                materials: {
                    name: 'Matières',
                    isOpen: false,
                    values: new Set()
                },
                types: {
                    name: 'Types',
                    isOpen: false,
                    values: new Set()
                },
                authors: {
                    name: 'Artisans',
                    isOpen: false,
                    values: new Set()
                }
            }
            
            this.products.forEach(product => {
                product.materials.forEach(material => {
                    filters.materials.values.add(material)
                })
                product.types.forEach(type => {
                    filters.types.values.add(type)
                })
                filters.authors.values.add(product.author)
            })
            this.filters = Object.assign({}, this.filters, filters)
        }
    })
})