import EventBus from '../eventBus.js'

const cart = {
    props: {
        getProducts: Array,
        getIsOpen: Boolean,
        getTotalQuantity: Number
    },
    computed: {
        products: function() {
            return this.getProducts
        },
        selectedProducts: function() {
            let selectedProducts = []
            this.products.forEach(product => {
                product.selected.forEach(selectedProduct => {
                    selectedProducts.push(selectedProduct)
                })
            })
            return selectedProducts
        },
        isOpen: function() {
            
        },
        totalQuantity: function() {
            return this.getTotalQuantity
        },
        totalPrice: function() {
            let totalPrice = 0
            this.selectedProducts.forEach(product => {
                const productSelectionPrice = product.stock.selectedQuantity * product.price
                totalPrice += productSelectionPrice
            })
            return totalPrice
        }
    },
    template: `
    <div class="cart" :class="{open: this.isOpen}">
        <div class="cart__entry" v-for="product in selectedProducts" v-if="product.stock.selectedQuantity > 0" :key="product.id">
            <img class="cart__entry__image" :src="product.image" />
            <div class="cart__entry__infos">
                <h1>{{ product.name }} <span v-if="!product.modelName && product.stock.selectedQuantity > 1">x {{ product.stock.selectedQuantity }}</span></h1>
                <h3 v-if="product.modelName">{{ product.modelName }} <span v-if="product.stock.selectedQuantity > 1">x {{ product.stock.selectedQuantity }}</span></h3>
                <h1>{{ getSelectionPrice(product) }} €</h1>
                <h2>par {{ product.author }}</h2>
            </div>
            
        </div>
        <button @click="cleanCart">Vider le panier</button>
        <button v-if="totalQuantity > 0" class="see orderBtn">Commander | {{ totalPrice }} €</button>
    </div>
    `,
    methods: {
        cleanCart: function() {
            sessionStorage.clear()
            this.$emit('clean-cart-order')
            EventBus.$emit('clean-selection')
        },
        getSelectionPrice: function(product) {
            const selectionPrice = product.stock.selectedQuantity * product.price
            return selectionPrice
        },
        saveCart: function() {
            const jsonCart = JSON.stringify(this.products)
            sessionStorage.setItem('cart', jsonCart)
        }
    },
    updated: function() {
        this.saveCart()
    }
}

export default cart