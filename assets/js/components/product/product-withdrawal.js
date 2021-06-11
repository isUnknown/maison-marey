const Widthdrawal = {
    props: {
        delivery: Object
    },
    data: function() {
        return {
            mode: ''
        }
    },
    template: `
        <div class="withdrawalMode">
            <p>Mode de retrait :</p>
            <select v-model="mode">
                <option selected hidden disabled>Choisissez</option>
                <option value="delivery">Livraison</option>
                <option value="withdrawal">Retrait en boutique</option>
            </select>
            <p v-if="mode === 'delivery'">Vous recevrez votre colis entre le … et le …</p>
            <p v-if="mode === 'withdrawal'"></p>
        </div>
    `
}

export default Widthdrawal