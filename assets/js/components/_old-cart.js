Vue.component('cart', {
    props: {
        getIsOpen: Boolean,
        getNewProduct: Object
    },
    data: function() {
        return {
            products: []
        }
    },
    template: `
    <div class="cart" :class="{open: this.isOpen}">
        <div class="cart__product" v-for="product in products" :key="product.id">
            <div>{{ product.name }}, par {{product.author}}. Quantité : {{ product.selectedQuantity }}. Prix : {{ getSelectionPrice(product) }} €</div>
        </div>
        <div v-if="quantity > 0" class="totalPrice">Total : {{ price }} €</div>
        <button @click="cleanCart">Vider le panier</button>
    </div>
    `,
    computed: {
        isOpen: function() {
            return this.getIsOpen
        },
        newProduct: function() {
            return this.getNewProduct
        },
        quantity: function() {
            let quantity = 0
            this.products.forEach(product => {
                quantity += product.selectedQuantity
            })
            return quantity
        },
        price: function() {
            let price = 0
            this.products.forEach(product => {
                price += product.selectedQuantity * product.price
            })
            return price
        }
    },
    watch: {
        newProduct: function(newProduct) {
            
            if(this.isInCart(newProduct)) {
                let registeredProduct = this.getProduct(newProduct)
                this.updateQuantity(registeredProduct, newProduct)
            } else {
                this.addToCart(newProduct)
            }
        },
        quantity: function() {
            this.sendQuantity()
        }
    },
    methods: {
        addToCart: function(newProduct) {
            this.products.push(newProduct)
        },
        updateQuantity: function(registeredProduct, newProduct) {
            registeredProduct.quantity += newProduct.quantity
        },
        isInCart: function(product) {
            return this.products.some(registeredProduct => registeredProduct.id === product.id)
        },
        getProduct: function(product) {
            let registeredProduct = this.products.filter(registeredProduct => registeredProduct.id === product.id)
            return registeredProduct[0]
        },
        saveCart: function() {
            const cart = {
                isOpen: false,
                products: this.products
            }
            const jsonCart = JSON.stringify(cart)
            sessionStorage.setItem('cart', jsonCart)
        },
        getCart: function() {
            let cart = JSON.parse(sessionStorage.getItem('cart'))
        },
        cleanCart: function() {
            this.products = []
        },
        sendQuantity: function() {
            let quantity = 0
            this.products.forEach(product => {
                quantity += product.quantity
            })
            this.$emit('update-quantity', quantity)
        },
        getSelectionPrice: function(product) {
            const selectionPrice = product.selectedQuantity * product.price
            return selectionPrice
        }
    },
    mounted: function() {
        if (sessionStorage.getItem('cart')) {
            let cart = JSON.parse(sessionStorage.getItem('cart'))
            this.products = cart.products

        }
    },
    updated: function() {
        this.saveCart()
    }
})