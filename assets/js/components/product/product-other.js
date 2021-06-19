import ProductSheet from "./product-sheet.js"

const Other = {
    props: {
        products: Array
    },
    components: {
        'product-sheet': ProductSheet,
    },
    computed: {
        shuffledProducts: function() {
            const shuffledProducts = this.shuffle(products)
            return shuffledProducts
        }
    },
    template: `
        <div class="modal__section modal__other">
            <div class="modal__otherWrapper">
                <product-sheet                
                    v-for="product in shuffledProducts"
                    :product="product"
                >
                </product-sheet>
            </div>
        </div>
    `,
    methods: {
        shuffle: function(array) {
            let shuffledArray = [...array]
            for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * i)
                const temp = shuffledArray[i]
                shuffledArray[i] = shuffledArray[j]
                shuffledArray[j] = temp
            }
            return shuffledArray
        }
    }
}

export default Other