import ProductHeader from './product-header.js'

const ProductModal = {
    props: {
        getProduct: Object
    },
    data: function() {
        return {
            selectedOptions: []
        }
    },
    components: {
        'product-header': ProductHeader
    },
    template: `
        <div class="modal">

            <div class="modal__product">
                <div class="modal__product__images">
                    <img :src="product.images[0]" />
                </div>
                
                <div class="modal__product__options">
                    <product-header
                        :product="product"
                    ></product-header>
                    
                    <div class="productOptions">
                        <div class="productOptions__option" v-for="option in product.options" :key="option.name">
                            <p>{{ option.name }}</p>
                            <div v-for="value in option.values" :key="value" :option="option">
                                <input type="radio" :id="value" :name="option.name" :value="value" v-model="selectedOptions">
                                <label class="option__value" :for="value"> {{ value }}</label><br>
                            </div>
                        </div>
                        <span class="moreless" @click="decrement">-</span>
                        <input class="productOptions__quantity" type="number" :value="product.inputQuantity" :max="product.remainingQuantity" min="0">
                        <span class="moreless" @click="increment">+</span>
                        <button @click="addToCart" class="addToCart">Ajouter au panier</button>
                    </div>
                
                </div>
                
                <div class="modal__product__details">
                </div>
            </div>
        </div>
    `,
    computed: {
        product: function() {
            return this.getProduct
        }
    },
    methods: {
        addToCart: function() {
            if (this.product.inputQuantity === 0) {
                return false
            }
            this.product.remainingQuantity -= this.product.inputQuantity
            this.product.selectedQuantity += this.product.inputQuantity

            if (this.product.remainingQuantity > 0) {
                this.product.inputQuantity = 1
            } else {
                this.product.inputQuantity = 0
            }

            console.log('Modal : product', this.product)
            this.$emit('add-to-cart', this.product)
        },
        increment: function() {
            if (this.product.inputQuantity < this.product.remainingQuantity) {
                this.product.inputQuantity++
            }
        },
        decrement: function() {
            if (this.product.inputQuantity > 0) {
                this.product.inputQuantity--
            }
        }
    }
}

export default ProductModal