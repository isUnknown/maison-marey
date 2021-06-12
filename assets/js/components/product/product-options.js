import EventBus from '../../eventBus.js'
import { String } from '../../libraries/app.js'

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
        isCompleteSelection: function() {
            return this.selectedOptions.length === this.options.length
        },
        isNotEmptySelection: function() {
            if (this.selectedOptions) {
                return true
            } else {
                return false
            }
        }
    },
    watch: {
        selectedOptions: function() {
            if (this.isCompleteSelection) {
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
                'entry': entry.name,
                'extraCost': 0,
                'extraTime': entry.extraTime
            }
            if (entry.extraCost) {
                newOption['extraCost'] = entry.extraCost
            }
            if (entry.extraTime) {
                newOption['extraTime'] = entry.extraTime
            }

            if (this.isNotEmptySelection) {
                if (this.selectedOptions.some(selectedOption => selectedOption.name === newOption.name)) {
                    let target = this.selectedOptions.filter(selectedOption => selectedOption.name === newOption.name)
                    target.entry = newOption.entry
                    if (entry.extraCost) {
                        target.extraCost = newOption.extraCost
                    }
                    console.log('Updated option: ', newOption)
                } else {
                    console.log('New option: ', newOption)
                    this.selectedOptions.push(newOption)
                }
            } else {
                console.log('New option: ', newOption)
                this.selectedOptions.push(newOption)
            }
        },
        cleanSelectedOptions: function() {
            this.selectedOptions = []
        },
        prepareSelection: function() {
            let preparedSelection = {
                'name': this.product.name,
                'modelName': '',
                'orderType': 'options',
                'author': this.product.author,
                'image': this.product.images[0],
                'extraCost': 0,
                'extraTime': 0,
                'options': {},
                'price': this.product.price,
                'stock': {
                    'selectedQuantity': 0
                }
            }
            this.selectedOptions.forEach((option, index) => {
                preparedSelection.options[option.name] = option.entry
                if (option.extraCost) {
                    preparedSelection.extraCost += option.extraCost
                    preparedSelection.price += option.extraCost
                }
                if (option.extraTime) {
                    preparedSelection.extraTime += option.extraTime
                }
                preparedSelection.modelName += `${option.entry} `
            })
            preparedSelection.modelName = String.capitalizeFirstLetter(preparedSelection.modelName.trim())
            return preparedSelection
        }
    },
    created: function() {
        EventBus.$on('deselect-options-order', () => {
            this.deselect()
            this.cleanSelectedOptions()
        })
        EventBus.$on('reset-selection', () => {
            this.deselect()
            this.cleanSelectedOptions()
        })
    }
}

export default ProductOptions