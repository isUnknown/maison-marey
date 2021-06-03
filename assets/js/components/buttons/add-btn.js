const Add = {
    props: {
        getMax: Number,
        value: Number
    },
    computed: {
        max: function() {
            return this.getMax
        },
        input: function() {
            return this.value
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
        }
    }
}

export default Add