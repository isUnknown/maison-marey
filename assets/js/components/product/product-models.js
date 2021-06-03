import AddBtn from '../buttons/add-btn.js'

const ProductModels = {
    props: {
        getProduct: Object
    },
    components: {
        'add-btn': AddBtn
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
        models: function() {
            return this.product.stock
        }
    },
    template: `
        <div class="product__models">
            <p>Choisissez un modèle :</p>
            <div v-for="model in models" :key="model.name">
                <input type="radio" :id="model.name" name="model" :value="model.name">
                <label @click="select(model)" class="option__value" :for="model.name"> {{ model.name }} <span v-if="model.extraCost">(+{{ model.extraCost }} €)</span></label><br>
            </div>
            
            <add-btn
            :value="input"
            :getMax="selection.quantity"
            @add="addToCart"
            v-if="this.selection && selection.quantity > 0"
            ></add-btn>
        </div>
    `,
    methods: {
        select: function(model) {
            this.selection = model
        },
        addToCart: function(quantity) {
            let selectedQuantity = quantity
            this.product.quantity -= quantity
            this.selection.quantity = quantity

            const target = this.product.selected.find(selectedProduct => selectedProduct.name === this.selection.name)
            if (target) {
                target.quantity += this.selection.quantity
            } else {
                this.product.selected.push(this.selection)
            }
        }
    }
}

export default ProductModels