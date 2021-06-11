import ProductHeader from './product-header.js'
import ProductModels from './product-models.js'
import AddBtn from '../buttons/add-btn.js'
import ProductOptions from '../product/product-options.js'
import Withdrawal from './product-withdrawal.js'

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
        selectionIsModel: function() {
            return this.selection.orderType === 'model' ? true : false
        },
        selectionIsInStock: function() {
            if (!this.selection) {
                return false
            }
            
            if (this.selection.stock.remainingQuantity > 0) {
                return true
            } else {
                return false
            }
        },
        selectionIsReadyForCart: function() {
            if (!this.selection) {
                return false
            }

            if (this.selection.orderType === 'options') {
                return true
            } else {
                if (this.selection.stock.remainingQuantity > 0) {
                    return true
                } else {
                    return false
                }
            }
        }
    },
    components: {
        'product-header': ProductHeader,
        'product-models': ProductModels,
        'add-btn': AddBtn,
        'product-options': ProductOptions,
        'withdrawal': Withdrawal
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
                        @clean-selection="cleanSelection"
                        :delivery="delivery"
                        :getProduct="product" 
                        v-if="product.hasModels">
                    </product-models>
                    
                    <p v-if="product.delivery">{{ selection.stock.remainingQuantity }} en stock. Livraison sous {{ delivery.min }} à {{ delivery.max }} jours</p>
                    <p class=".empty" v-if="selection.stock && selection.stock.remainingQuantity === 0">Ce modèle n'est plus disponible en stock.</p>

                    <p v-if="product.stock.length > 0 && product.options.length "><b>Ou passez commande :</b><br>
                    Production sous {{ product.productionTime }} jours en moyenne.</p>

                    <product-options
                        @send-selection="select"
                        @clean-selection="cleanSelection"
                        :getProduct="product"
                        :delivery="delivery"
                        v-if="product.hasOptions">
                    </product-options>

                    <withdrawal
                        v-if="selection && (product.isDelivery && product.isWithdrawal)">
                        :getWithDrawalTime="selection.withdrawalTime"
                        :delivery="delivery"
                    </withdrawal>
                    
                    <add-btn
                        v-if="selection && selectionIsReadyForCart"
                        :getInput="input"
                        :getMax="selection.stock.remainingQuantity ? selection.stock.remainingQuantity : 999"
                        @add="addToCart">
                    </add-btn>
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

            selection.stock.selectedQuantity += newQuantity

            if (selection.stock.remainingQuantity) {
                selection.stock.remainingQuantity -= newQuantity
            }
            
            let target = this.selectionIsModel ? selected.find(selectedProduct => selectedProduct.modelName === selection.modelName) : selected.find(selectedProduct => selectedProduct.name === selection.name)
            
            if (target) {
                console.log('Update target :', target)
            } else {
                this.product.selected.push(this.selection)
            }

            setTimeout(() => {
                EventBus.$emit('open-cart-order')
            }, 200);
            this.selection = false
        },
        select: function(selection) {
            this.selection = selection
            this.resetInput()
        },
        cleanSelection: function() {
            this.selection = false
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