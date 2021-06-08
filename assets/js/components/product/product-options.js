import EventBus from '../../eventBus.js'

const ProductOptions = {
    props: {
        getProduct: Object,
        delivery: Object
    },
    data: function() {
        return {
            selectedOptions: []
        }
    },
    computed: {
        product: function() {
            return this.getProduct
        },
        options: function() {
            return this.product.options
        },
        isComplete: function() {
            return this.selectedOptions.length === this.options.length
        }
    },
    watch: {
        selectedOptions: function() {
            if (this.isComplete) {
                const preparedSelection = this.prepareSelection()
                this.$emit('send-selection', preparedSelection)
                console.log('Selection sent : ', preparedSelection)
            }
        }
    },
    template: `
        <div class="product__options">
            <p>Choisissez vos options :</p>
            <select v-for="option in options" @click="deselectModels">
                <option value="" disabled selected hidden>{{ option.name }}</option>
                <option v-for="entry in option.entries" @click="select(option, entry)">{{ entry.name }} <span v-if="entry.extraCost">({{ entry.extraCost }} €)</span></option>
            </select>
        </div>
    `,
    methods: {
        deselectModels: function() {
            EventBus.$emit('deselect-models-order')
            this.$emit('clean-selection')
        },
        deselect: function() {
            document.querySelectorAll('.product__options select').forEach(option => {
                option.querySelectorAll('option').forEach((entry, index) => {
                    const isDefault = index === 0
                    if (isDefault) {
                        entry.selected = true
                    } else {
                        entry.selected = false
                    }
                })
            })
        },
        select: function(option, entry) {
            let newOption = {
                'name': option.name,
                'entry': entry.name
            }
            if (entry.extraCost) {
                newOption['extraCost'] = entry.extraCost
            }
            this.selectedOptions.push(newOption)
        },
        prepareSelection: function() {
            let preparedSelection = {
                'name': this.product.name,
                'author': this.product.author,
                'image': this.product.images[0],
                'options': {},
                'price': this.product.price
            }
            this.selectedOptions.forEach(option => {
                preparedSelection.options[option.name] = option.entry
                if (option.extraCost) {
                    preparedSelection.price += option.extraCost
                }
            })
            return preparedSelection
        }
    },
    created: function() {
        EventBus.$on('deselect-options-order', () => {
            this.deselect()
        })
        console.log(this.options)
    }
}

export default ProductOptions