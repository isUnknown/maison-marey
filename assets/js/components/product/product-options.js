const ProductOptions = {
    props: {
        getProduct: Object,
        delivery: Object
    },
    computed: {
        product: function() {
            return this.getProduct
        },
        options: function() {
            return this.product.options
        },
        selection: function() {
            let selection = []
            this.options.forEach(option => {
                this.selection.push(option.name)
            });
            return selection
        }
    },
    template: `
        <div class="product__options">
            <p>Choisissez vos options :</p>
            <select v-for="option in options">
                <option value="" disabled selected hidden>{{ option.name }}</option>
                <option v-for="entry in option.entries">{{ entry.name }} <span v-if="entry.extraCost">({{ entry.extraCost }} €)</span></option>
            </select>
        </div>
    `
}

export default ProductOptions