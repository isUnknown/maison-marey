Vue.component('cart', {
    props: {
        getProducts: Array,
        getIsOpen: Boolean,
        getTotalQuantity: Number
    },
    computed: {
        products: function() {
            return this.getProducts
        },
        isOpen: function() {
            return this.getIsOpen
        },
        totalQuantity: function() {
            return this.getTotalQuantity
        },
        totalPrice: function() {
            let totalPrice = 0
            this.products.forEach(product => {
                const productSelectionPrice = product.selectedQuantity * product.price
                totalPrice += productSelectionPrice
            })
            return totalPrice
        }
    },
    template: `
    <div class="cart" :class="{open: this.isOpen}">
        <div class="cart__product" v-for="product in products" v-if="product.selectedQuantity > 0" :key="product.id">
            <div>{{ product.name }}, par {{product.author}}. Quantité : {{ product.selectedQuantity }}. Prix : {{ getSelectionPrice(product) }} €</div>
        </div>
        <div v-if="totalQuantity > 0" class="totalPrice">Total : {{ totalPrice }} €</div>
        <button @click="cleanCart">Vider le panier</button>
    </div>
    `,
    methods: {
        cleanCart: function() {
            this.products.forEach(product => {
                product.selectedQuantity = 0
                product.remainingQuantity = product.maxQuantity
            })
        },
        getSelectionPrice: function(product) {
            const selectionPrice = product.selectedQuantity * product.price
            return selectionPrice
        },
        saveCart: function() {
            const cart = {
                isOpen: false,
                products: this.products
            }
            const jsonCart = JSON.stringify(cart)
            sessionStorage.setItem('cart', jsonCart)
        }
    },
    updated: function() {
        this.saveCart()
    }
})