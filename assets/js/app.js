import { Data } from './libraries/app.js'

// COMPONENTS
import Filter from './components/filter.js'
import Cart from './components/cart.js'
import ProductSheet from './components/product/product-sheet.js'
import ProductModal from './components/product/product-modal.js'
import Nav from "./components/nav/nav.js";

import EventBus from './eventBus.js'
import Store from './store.js'

let navPages = JSON.parse(document.body.dataset.navPages)

const productsUrl = `${document.body.dataset.rootUrl}/shop`
fetch(productsUrl).then(res => {
    return res.json()
}).then(shop => {

    // STORE SHARED VARIABLES
    Store.state.coupons = shop.coupons
    Store.state.authors = shop.authors
    Store.state.products = shop.products

    console.log(shop)

    const vm = new Vue({
        el: '#app',
        components: {
            'vue-filter': Filter,
            'cart': Cart,
            'product-sheet': ProductSheet,
            'product-modal': ProductModal,
            'vue-header': Nav
        },
        data: {
            rootUrl: document.body.dataset.rootUrl,
            products: Store.state.products,
            delivery: shop.delivery,
            filters: {
                all: {},
                active: []
            },
            activeFilters: [],
            store: Store,
            navPages: navPages
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
                if (this.store.state.modal) {
                    return false
                } else {
                    return true
                }
            },
            totalQuantity: function() {
                let totalQuantity = 0
                this.products.forEach(product => {
                    product.selected.forEach(selectedProduct => {
                        totalQuantity += selectedProduct.stock.selectedQuantity
                    })
                })
                return totalQuantity
            },
            cart: function() {
                let cart = []
                this.products.forEach(product => {
                    product.selected.forEach(selectedProduct => {
                        cart.push(selectedProduct)
                    })
                })
                return cart
            }
        },
        methods: {
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
            openModal: function(product) {
                console.log('openModal')
                this.store.state.modal = product
            },
            closeModal: function() {
                this.store.state.modal = false
            }
        },
        created: function() {
            let filters = document.querySelector('[data-filters]') ? JSON.parse(document.querySelector('[data-filters]').dataset.filters) : null
            if (filters) {
                filters.forEach(filter => {
                    filter.isOpen = false
                })
                this.filters.all = Object.assign({}, this.filters.all, filters)
            }

            window.addEventListener('keydown', (e) => {
                if (event.key === 'Escape') {
                    this.closeModal()
                }
            })

            EventBus.$on('open-cart-order', () => {
                this.openCart()
            })
        },
        mounted: function() {
            // GET SAVED CART
            if (sessionStorage.getItem('cart')) {
                let savedProducts = JSON.parse(sessionStorage.getItem('cart'))
                if (savedProducts.some(savedProduct => savedProduct.selected.length > 0)) {
                    this.products = []
                    savedProducts.forEach((savedProduct, index) => {
                        this.$set(this.products, index, savedProduct)
                    })
                } else {
                    sessionStorage.clear()
                }
            }
        }
    })
})