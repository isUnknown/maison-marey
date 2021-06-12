const Widthdrawal = {
    props: {
        isDelivery: Boolean,
        isWithdrawal: Boolean,
        delivery: Object,
        withdrawalTime: Number,
        extraTime: Number
    },
    data: function() {
        return {
            mode: ''
        }
    },
    watch: {
        mode: function() {
            this.$emit('send-mode', this.mode)
        }
    },
    template: `
        <div class="withdrawalMode">
            <p>Mode de retrait :</p>
            <select>
                <option selected hidden disabled>Choisissez</option>
                <option value="delivery" @click="select('delivery')">Livraison</option>
                <option value="withdrawal" @click="select('withdrawal')">Retrait en boutique</option>
            </select>
        </div>
    `,
    methods: {
        select: function(mode) {
            this.mode = mode
        }
    }
}

export default Widthdrawal