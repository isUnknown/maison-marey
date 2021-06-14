import { Data } from './libraries/app.js'
import Filter from './components/filter.js'
import Cart from './components/cart.js'
import ProductSheet from './components/product/product-sheet.js'
import ProductModal from './components/product/product-modal.js'
import EventBus from './eventBus.js'
import Store from './store.js'

const productsUrl = `${document.body.dataset.rootUrl}/shop`
fetch(productsUrl).then(res => {
    return res.json()
}).then(shop => {

    Store.state.coupons = shop.coupons
    Store.state.authors = shop.authors

    const vm = new Vue({
        el: '#app',
        components: {
            'vue-filter': Filter,
            'cart': Cart,
            'product-sheet': ProductSheet,
            'product-modal': ProductModal
        },
        data: {
            products: shop.products,
            delivery: shop.delivery,
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
                    product: {},
                }
            },
            store: Store
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
            openCart: function() {
                this.sharedProperties.cart.isOpen = true
            },
            cleanCart: function() {
                console.log('shop: cleanCart')
                this.products.forEach(product => {
                    product.selected = []
                    product.stock.forEach(item => {
                        item.stock.selectedQuantity = 0
                        if (item.orderType === 'model') {
                            item.stock.remainingQuantity = item.stock.maxQuantity
                        }
                        console.log('item', item)
                    })
                    if (product.isDelivery && product.isWithdrawal) {
                        product.withdrawalMode = 'dual'
                        product.withdrawalModeFixed = false
                    }
                })
            },
            openModal: function(product) {
                this.sharedProperties.modal.product = product
            },
            closeModal: function() {
                console.log('closeModal')
                this.sharedProperties.modal.product = false
            }
        },
        created: function() {
            let filters = JSON.parse(document.querySelector('[data-filters]').dataset.filters)
            filters.forEach(filter => {
                filter.isOpen = false
            })
            this.filters.all = Object.assign({}, this.filters.all, filters)

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