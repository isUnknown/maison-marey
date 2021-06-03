import ProductHeader from './product-header.js'
import ProductModels from './product-models.js'

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
        'product-header': ProductHeader,
        'product-models': ProductModels
    },
    template: `
        <div class="modal">

            <div class="modal__product">
                <div class="modal__product__images">
                    <img :src="product.images[0]" />
                </div>
                
                <div class="modal__product__options">
                    <product-header :product="product" ></product-header>
                    
                    <product-models :getProduct="product" v-if="product.stock.length > 0"></product-models>
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