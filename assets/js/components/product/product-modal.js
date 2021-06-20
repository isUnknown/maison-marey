// =========================================== COMPONENTS
import ProductHeader from './product-header.js'
import ProductModels from './product-models.js'
import AddBtn from '../buttons/add-btn.js'
import ProductOptions from '../product/product-options.js'
import Withdrawal from './product-withdrawal.js'
import Author from './product-author.js'
import Other from './product-other.js'

// =========================================== SHARE
import EventBus from '../../eventBus.js'
import Store from '../../store.js'

const ProductModal = {
    props: {
        getProduct: Object,
        delivery: Object
    },
    data: function() {
        return {
            selection: false,
            input: 1,
            store: Store
        }
    },
    computed: {
        product: function() {
            return this.getProduct
        },
        author: function() {
            const author = this.store.state.authors.find(author => author.name === this.product.author)

            return author
        },
        minDelivery: function() {
            if (this.selection && this.selection.extraTime) {
                return this.delivery.min + this.selection.extraTime
            } else {
                return this.delivery.min
            }
        },
        maxDelivery: function() {
            if (this.selection && this.selection.extraTime) {
                return this.delivery.max + this.selection.extraTime
            } else {
                return this.delivery.max
            }
        },
        isSelectionModel: function() {
            return this.selection.orderType === 'model' ? true : false
        },
        isSelectionOption: function() {
            return this.selection.orderType === 'options' ? true : false
        },
        isSelectionInStock: function() {
            if (!this.selection) {
                return false
            }
            
            if (this.selection.stock.remainingQuantity > 0) {
                return true
            } else {
                return false
            }
        },
        isSelectionReadyForCart: function() {
            if (!this.selection || this.product.withdrawalMode === 'dual') {
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
        'withdrawal': Withdrawal,
        'author': Author,
        'other': Other
    },
    template: `
        <div class="modal">

            <div class="modal__product">
                <div class="modal__product__images swiper-container">
                    <div class="swiper-wrapper">
                        <img class="swiper-slide" v-for="image in product.images" :src="image" />
                    </div>
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
                        v-if="!product.withdrawalModeFixed"
                        :delivery="delivery"
                        :is-withdrawal="product.isWithdrawal"
                        :is-delivery="product.isDelivery"
                        :withdrawal-time="product.withdrawalTime"
                        :extra-time="selection.extraTime"
                        @send-mode="setWithdrawalMode"
                    >
                    </withdrawal>

                    <p class="product__withdrawalMessage" v-if="product.withdrawalMode === 'delivery'"><b>Livraison</b> dans {{ minDelivery }} à {{ maxDelivery }} jours.</p>
                    <p class="product__withdrawalMessage" v-if="product.withdrawalMode === 'withdrawal'"><b>Retrait en boutique</b> dans environ {{ product.productionTime }} jours.</p>
                    
                    <add-btn
                        v-if="selection && isSelectionReadyForCart"
                        :getInput="input"
                        :getMax="selection.stock.remainingQuantity ? selection.stock.remainingQuantity : 999"
                        @add="addToCart">
                    </add-btn>
                </div>
                
                <div class="modal__product__details">
                    <author
                        :author="author"
                    >
                    </author>
                    <other>
                    </other>
                </div>
                
            </div>
        </div>
    `,
    methods: {
        addToCart: function(nbrToAdd) {
            console.log('Composant modale : nombre à ajouter', nbrToAdd)
            this.product.withdrawalModeFixed = true
            let selection = this.selection
            let selected = this.product.selected

            selection.stock.selectedQuantity += nbrToAdd

            if (selection.stock.remainingQuantity) {
                selection.stock.remainingQuantity -= nbrToAdd
            }
            
            let target = this.isSelectionModel || this.isSelectionOptions ? selected.find(selectedProduct => selectedProduct.modelName === selection.modelName) : selected.find(selectedProduct => selectedProduct.modelName === selection.modelName)
            console.log('Composant modale : target : ', target)
            
            if (!target) {
                this.product.selected.push(this.selection)
            }

            setTimeout(() => {
                this.store.toggleIsCartOpenAction()
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
        },
        setWithdrawalMode: function(mode) {
            this.product.withdrawalMode = mode
        }
    },
    mounted: function() {
        EventBus.$on('clean-selection', () => {
            this.selection = false
        })
        const swiper = new Swiper('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
        
            // If we need pagination
            // pagination: {
            // el: '.swiper-pagination',
            // },
        
            // Navigation arrows
            // navigation: {
            // nextEl: '.swiper-button-next',
            // prevEl: '.swiper-button-prev',
            // },
        
            // And if we need scrollbar
            // scrollbar: {
            // el: '.swiper-scrollbar',
            // },
        });
          
    }
}

export default ProductModal