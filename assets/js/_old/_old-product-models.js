const ProductModels = {
    props: {
        getProduct: Object
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
            <div v-for="model in models" :key="model.modelName">
                <input type="radio" :id="model.modelName" name="model" :value="model.modelName">
                <label @click="select(model)" class="option__value" :for="model.modelName"> {{ model.modelName }} <span v-if="model.extraCost">(+{{ model.extraCost }} €)</span></label><br>
            </div>
        </div>
    `,
    methods: {
        select: function(model) {
            this.$emit('send-selection', model)
        }
    }
}

export default ProductModels