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
                    isOpen: false
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
            },
            totalQuantity: function() {
                let totalQuantity = 0
                this.products.forEach(product => {
                    totalQuantity += product.selectedQuantity
                })
                return totalQuantity
            }
        },
        methods: {
            parseToNumber: function() {
                this.products.forEach(product => {
                    product.inputQuantity = parseInt(product.inputQuantity)
                    product.selectedQuantity = parseInt(product.selectedQuantity)
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
                this.toggleCart()
                this.sharedProperties.cart.newProduct = product
            },
            openModal: function(product) {
                this.sharedProperties.modal.product = product
            }
        },
        beforeUpdate: function() {
            this.parseToNumber()
        },
        created: function() {
            let filters = JSON.parse(document.querySelector('[data-filters]').dataset.filters)
            filters.forEach(filter => {
                filter.isOpen = false
            })
            this.filters.all = Object.assign({}, this.filters.all, filters)

            if (sessionStorage.getItem('cart')) {
                let cart = JSON.parse(sessionStorage.getItem('cart'))
                this.products = cart.products
            }
        }
    })
})