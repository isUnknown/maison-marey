import ProductHeader from './product-header.js'
import ProductModels from './product-models.js'
import AddBtn from '../buttons/add-btn.js'
import ProductOptions from '../product/product-options.js'

import EventBus from '../../eventBus.js'

const ProductModal = {
    props: {
        getProduct: Object,
        delivery: Object
    },
    data: function() {
        return {
            selection: false,
            input: 1
        }
    },
    computed: {
        product: function() {
            return this.getProduct
        },
        hasOptions: function() {
            if (this.product.options.length > 0) {
                return true
            } else {
                return false
            }
        },
        hasModels: function() {
            if (this.product.stock.length > 0) {
                return true
            } else {
                return false
            }
        }
    },
    components: {
        'product-header': ProductHeader,
        'product-models': ProductModels,
        'add-btn': AddBtn,
        'product-options': ProductOptions
    },
    template: `
        <div class="modal">

            <div class="modal__product">
                <div class="modal__product__images">
                    <img :src="product.images[0]" />
                </div>
                
                <div class="modal__product__options">
                    <product-header :product="product" ></product-header>
                    
                    <product-models 
                        @send-selection="select" 
                        :delivery="delivery"
                        :getProduct="product" 
                        v-if="hasModels">
                    </product-models>

                    <p v-if="product.stock.length > 0 && product.options.length "><b>Ou passez commande :</b><br>
                    Production sous {{ product.productionTime }} jours en moyenne.</p>

                    <product-options
                        :getProduct="product"
                        :delivery="delivery"
                        v-if="hasOptions">
                    </product-options>

                    <p v-if="selection && selection.remainingQuantity > 0">{{ selection.remainingQuantity }} en stock. Livraison sous {{ delivery.min }} à {{ delivery.max }} jours</p>
                    
                    <add-btn
                        v-if="selection && selection.remainingQuantity > 0"
                        :getInput="input"
                        :getMax="selection.remainingQuantity"
                        @add="addToCart">
                    </add-btn>
                    
                    <p class=".empty" v-if="selection.remainingQuantity === 0">Ce modèle n'est plus disponible en stock.</p>
                </div>
                
                <div class="modal__product__details">
                </div>
            </div>
        </div>
    `,
    methods: {
        addToCart: function(newQuantity) {
            let selection = this.selection
            let selected = this.product.selected

            selection.selectedQuantity += newQuantity
            selection.remainingQuantity -= newQuantity
            
            let target = this.isModel() ? selected.find(selectedProduct => selectedProduct.modelName === selection.modelName) : selected.find(selectedProduct => selectedProduct.name === selection.name)
            
            if (target) {
                console.log('Update target :', target)
            } else {
                this.product.selected.push(this.selection)
            }

            setTimeout(() => {
                EventBus.$emit('open-cart-order')
            }, 200);
        },
        select: function(selection) {
            this.selection = selection
            this.resetInput()
        },
        isModel: function() {
            if(this.selection.modelName) {
                return true
            } else {
                return false
            }
        },
        resetInput: function() {
            this.input = 0
            setTimeout(() => {
                this.input = 1
            }, 5);
        }
    },
    created: function() {
        EventBus.$on('clean-selection', () => {
            this.selection = false
        })
    }
}

export default ProductModal