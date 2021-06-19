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
            store: Store,
            isValidCoupon: false,
            inputCoupon: '',
            validCoupon: ''
        }
    },
    watch: {
        inputCoupon: function() {
            if (this.inputCoupon.length === 8) {
                this.checkCoupon()
            }
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
        },
        discountPrice: function() {
            if (!this.validCoupon) {
                return false
            }
            let discountPrice
            if (this.validCoupon.mode === 'amount') {
                discountPrice = this.totalPrice - this.validCoupon.discount
                return discountPrice
            } else {
                discountPrice = this.totalPrice - ((this.totalPrice / 100) * this.validCoupon.discount)
                return discountPrice
            }
        }
    },
    template: `
    <div class="cart" :class="{ open: store.state.isCartOpen }">
        <div class="cart__scrollable">
            <div class="cart__entry" v-for="product in selectedProducts" v-if="product.stock.selectedQuantity > 0" :key="product.id">
                <img class="cart__entry__image" :src="product.image" />
                <div class="cart__entry__infos">
                    <h1>{{ product.name }} <span v-if="!product.modelName && product.stock.selectedQuantity > 1">x {{ product.stock.selectedQuantity }}</span></h1>
                    <h3 v-if="product.modelName">{{ product.modelName }} <span v-if="product.stock.selectedQuantity > 1">x {{ product.stock.selectedQuantity }}</span></h3>
                    <h1>{{ product.price }} €</h1>
                    <h2>par {{ product.author }}</h2>
                    
                    <span class="moreless" @click="decrement(product)">-</span>
                    <input class="quantity" type="number" v-model="product.stock.selectedQuantity" :max="product.stock.remainingQuantity" min="0">
                    <span class="moreless" :class="product.stock.remainingQuantity === 0 ? 'hidden' : ''" @click="increment(product)">+</span>
                </div>
                
            </div>
            
            <button class="cart__cleanBtn" v-if="selectedProducts.length > 0" @click="cleanCart">Vider le panier</button>
            
            <div v-else class="cart__empty">
                <h1>Panier vide.</h1>
            </div>
        </div>
        
        <div class="cart__checkout">
            <div class="coupons" v-if="this.store.state.coupons">
                <label class="coupons__label">Coupons de réduction : </label>
                <input v-model="inputCoupon" class="coupons__input" type="text" maxlength="8">
                <p style="margin-bottom: 0;" v-if="isValidCoupon">Ok</p>
            </div>
            
            <button @click="checkout" v-if="totalQuantity > 0" class="see">
                Commander | {{ totalPrice }} € <span v-if="isValidCoupon">(-{{ this.validCoupon.discount }}<span v-if="this.validCoupon.mode === 'percent'">%</span><span v-else>€</span> = {{ discountPrice }} €)</span>
            </button>
        </div>
    </div>
    `,
    methods: {
        increment: function(product) {
            product.stock.selectedQuantity++
            if (product.orderType === 'model') {
                product.stock.remainingQuantity--
            }
        },
        decrement: function(product) {
            if (product.stock.selectedQuantity > 0) {
                product.stock.selectedQuantity--
                if (product.stock.selectedQuantity === 0) {
                    if (!this.selectedProducts.some(selectedProduct => selectedProduct.stock.selectedQuantity > 0)) {
                        this.cleanCart()
                    }
                }
                if (product.orderType === 'model') {
                    product.stock.remainingQuantity++
                }
            }
        },
        cleanCart: function() {
            this.products.forEach(product => {
                product.selected = []
                product.stock.forEach(item => {
                    item.stock.selectedQuantity = 0
                    if (item.orderType === 'model') {
                        item.stock.remainingQuantity = item.stock.maxQuantity
                    }
                })
                if (product.isDelivery && product.isWithdrawal) {
                    product.withdrawalMode = 'dual'
                    product.withdrawalModeFixed = false
                }
            })

            sessionStorage.clear()
            this.store.toggleIsCartOpenAction()
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
        checkCoupon: function() {
            console.log(this.store.state.coupons)
            const target = this.store.state.coupons.find(coupon => coupon.code === this.inputCoupon)
            if (target) {
                this.isValidCoupon = true
                this.validCoupon = target
            }
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
    updated: function() {
        document.querySelectorAll('.products, .modal').forEach(node => {
            node.addEventListener('click', () => {
                if (this.store.state.isCartOpen) {
                    this.store.state.isCartOpen = false
                }
            })
        })
        this.saveCart()
    }
}

export default cart