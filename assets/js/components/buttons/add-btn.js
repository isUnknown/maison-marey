const Add = {
    props: {
        getMax: Number,
        getInput: Number
    },
    data: function() {
        return {
            input: this.getInput
        }
    },
    computed: {
        max: function() {
            return this.getMax
        }
    },
    watch: {
        getInput: function() {
            this.input = this.getInput
        }
    },
    template: `
        <div class="addSection">
            <span class="moreless" @click="decrement">-</span>
            <input class="quantity" type="number" :value="input" :max="max" min="0">
            <span class="moreless" @click="increment">+</span>
            <button class="add" @click="add">Ajouter au panier</button>
        </div>
    `,
    methods: {
        increment: function() {
            if (this.input < this.max) {
                this.input++
            }
        },
        decrement: function() {
            if (this.input > 0) {
                this.input--
            }
        },
        add: function() {
            this.$emit('add', this.input)
            this.input = 1
        }
    }
}

export default Add