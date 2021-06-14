import EventBus from '../eventBus.js'
import Store from '../store.js'

const cart = {
    props: {
        getProducts: Array,
        getIsOpen: Boolean,
        getTotalQuantity: Number
    },
    data: function() {
        return {
            store: Store
        }
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
    <div class="cart" :class="{ open: store.state.isCartOpen }">
        <div class="cart__entry" v-for="product in selectedProducts" v-if="product.stock.selectedQuantity > 0" :key="product.id">
            <img class="cart__entry__image" :src="product.image" />
            <div class="cart__entry__infos">
                <h1>{{ product.name }} <span v-if="!product.modelName && product.stock.selectedQuantity > 1">x {{ product.stock.selectedQuantity }}</span></h1>
                <h3 v-if="product.modelName">{{ product.modelName }} <span v-if="product.stock.selectedQuantity > 1">x {{ product.stock.selectedQuantity }}</span></h3>
                <h1>{{ product.price }} €</h1>
                <h2>par {{ product.author }}</h2>
                
                <span class="moreless" @click="decrement(product)">-</span>
                <input class="quantity" type="number" v-model="product.stock.selectedQuantity" :max="product.stock.remainingQuantity" min="0">
                <span class="moreless" @click="increment(product)">+</span>
            </div>
            
        </div>
        <button v-if="selectedProducts.length > 0" @click="cleanCart">Vider le panier</button>
        <div v-else class="cart__empty">
            <h1>Panier vide.</h1>
        </div>
        <button @click="checkout" v-if="totalQuantity > 0" class="see orderBtn">Commander | {{ totalPrice }} €</button>
    </div>
    `,
    methods: {
        increment: function(product) {
            if (product.stock.maxQuantity && product.stock.selectedQuantity < product.stock.maxQuantity) {
                product.stock.selectedQuantity++
                product.stock.remainingQuantity--
            } else {
                product.stock.selectedQuantity++
            }
        },
        decrement: function(product) {
            if (product.stock.selectedQuantity > 0) {
                product.stock.selectedQuantity--
            }
        },
        cleanCart: function() {
            sessionStorage.clear()
            this.store.toggleIsCartOpenAction()
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
        },
        checkout: function() {
            // Create an instance of the Stripe object with your publishable API key
    let stripe = Stripe("pk_test_51ImEC4Lwp1JhIR6fa3EQkM4i4ugS8Elv0Bkr88QgqctDj5dKzYT23eMtwEdRxf882LhadbzoQlB80bXeN33QS5nO00cZuOvL36");
    const rootUrl = document.body.dataset.rootUrl
    let preparedSelection = []

    this.products.forEach(product => {
        product.selected.forEach(selectedProduct => {
            const product = {
                name: `${selectedProduct.name} - ${selectedProduct.modelName}`,
                price: selectedProduct.price,
                image: selectedProduct.image,
                quantity: selectedProduct.stock.selectedQuantity
            }
            
            preparedSelection.push(product)
        })
    })

      fetch(`${rootUrl}/assets/functions/create-checkout-session.php`, {
        method: "POST",
        body: JSON.stringify(preparedSelection)
      })
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (session) {
            console.log(session)
            return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
          // If redirectToCheckout fails due to a browser or network
          // error, you should display the localized error message to your
          // customer using error.message.
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
        }
    },
    mounted: function() {
        document.querySelector('.products').addEventListener('click', () => {
            if (this.store.state.isCartOpen) {
                this.store.state.isCartOpen = false
            }
        })
    },
    updated: function() {
        this.saveCart()
    }
}

export default cart