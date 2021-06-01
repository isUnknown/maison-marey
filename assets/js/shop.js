import { Data } from './libraries/app.js'
import './components/filters.js'
import './components/cart.js'
import './components/product-sheet.js'
import './components/product-modal.js'

const productsUrl = `${document.body.dataset.rootUrl}/products`
fetch(productsUrl).then(res => {
    return res.json()
}).then(products => {
    const vm = new Vue({
        el: '#app',
        data: {
            products: products,
            filters: {
                all: {},
                active: []
            },
            activeFilters: [],
            sharedProperties: {
                cart: {
                    isOpen: false,
                    newProduct: {},
                    quantity: 0
                },
                modal: {
                    product: {}
                }
            }
        },
        computed: {
            filteredProducts: function() {
                if (this.filters.active.length === 0) {

                    return this.products

                } else {
                    const activeFilters = this.filters.active.map(activeFilter => activeFilter.value)
                
                    let filteredProducts = []
                    this.products.forEach(product => {
                        let tags = []
                        tags.push(product.author)
                        tags.push(product.materials)
                        tags.push(product.types)
                        tags = tags.flat()
                        if (activeFilters.every(activeFilter => tags.includes(activeFilter))) {
                            filteredProducts.push(product)
                        }
                    })
                    return filteredProducts
                }
            },
            modalIsEmpty: function() {
                if (Object.keys(this.sharedProperties.modal.product).length === 0) {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            parseToNumber: function() {
                this.products.forEach(product => {
                    product.inputQuantity = parseInt(product.inputQuantity)
                    // product.selectedQuantity = parseInt(product.selectedQuantity)
                    product.quantity = parseInt(product.quantity)
                    product.price = parseInt(product.price)
                })
            },
            refreshActiveFilters: function(newFilter) {
                if (this.filters.active.some(activeFilter => activeFilter.name === newFilter.name)) {
                    this.filters.active = this.filters.active.filter(activeFilter => activeFilter.name !== newFilter.name)
                    if (newFilter.value === '') {
                        return false
                    }
                    this.filters.active.push(newFilter)
                } else {
                    if (newFilter.value === '') {
                        return false
                    }
                    this.filters.active.push(newFilter)
                }
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
            },
            getActiveTags: function() {
                let activeTags = []
                this.activeFilters.forEach(activeFilter => {
                    activeTags.push(activeFilter.value)
                })
                return activeTags
            },
            toggleCart: function() {
                this.sharedProperties.cart.isOpen = !this.sharedProperties.cart.isOpen
            },
            addToCart: function(product) {
                console.log('App : addToCart()')
                this.sharedProperties.cart.isOpen = true

                let newProduct = {}
                newProduct.id = product.id
                newProduct.name = product.name
                newProduct.author = product.author
                newProduct.cover = product.cover
                newProduct.price = product.price
                newProduct.quantity = product.inputQuantity

                this.sharedProperties.cart.newProduct = newProduct

                product.remainingQuantity -= newProduct.quantity
                product.inputQuantity = 1
            },
            getCartQuantity: function (quantity) {
                this.sharedProperties.cart.quantity = quantity
            },
            openModal: function(product) {
                this.sharedProperties.modal.product = product
            }
        },
        updated: function() {
            this.parseToNumber()
        },
        created: function() {
            let filters = JSON.parse(document.querySelector('[data-filters]').dataset.filters)
            filters.forEach(filter => {
                filter.isOpen = false
            })
            this.filters.all = Object.assign({}, this.filters.all, filters)
        }
    })
})