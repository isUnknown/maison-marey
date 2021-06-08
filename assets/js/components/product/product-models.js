import EventBus from '../../eventBus.js'

const ProductModels = {
    props: {
        getProduct: Object,
        delivery: Object
    },
    data: function() {
        return {
            selection: ''
        }
    },
    computed: {
        product: function() {
            return this.getProduct
        },
        models: function() {
            return this.product.stock
        },
        selectedModel: function() {
            const selectedModel = this.models.find(model => model.modelName === this.selection)
            return selectedModel
        }
    },
    watch: {
        selection: function() {
            this.$emit('send-selection', this.selectedModel)
        }
    },
    template: `
        <div>
            <p>
                <b>Choisissez un modèle en stock :</b><br>
                Livraison sous {{ delivery.min }} à {{ delivery.max }} jours.
            </p>
            
            <select class="product__models" v-model="selection" @click="deselectOptions">
                <option value="" disabled selected hidden>Modèles disponibles</option>
                <option v-for="model in models" :value="model.modelName">{{ model.modelName }} <span v-if="model.extraCost">(+ {{ model.extraCost }} €)</span></option>
            </select>
        
        </div>
    `,
    methods: {
        deselectOptions: function() {
            EventBus.$emit('deselect-options-order')
            this.$emit('clean-selection')
        },
        deselect: function() {
            let options = document.querySelectorAll('.product__models option')

            options.forEach((option, index) => {
                const isDefault = index === 0
                if (isDefault) {
                    option.selected = true
                } else {
                    option.selected = false
                }
            })
        }
    },
    created: function() {
        EventBus.$on('deselect-models-order', () => {
            this.deselect()
        })
    }
}

export default ProductModels