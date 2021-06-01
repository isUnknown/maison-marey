Vue.component('product-modal', {
    props: {
        getProduct: Object
    },
    template: `
        <div class="modal">

            <div class="modal__product">
                <div class="modal__product__images">
                    <img :src="product.cover" />
                </div>
                
                <div class="modal__product__options">
                    <h1 class="product__name">{{ product.name }}</h1>
                    <p class="product__author">{{ product.author }}</p>
                    <h4 class="product__price">{{ product.price }} €</h4>
                    <p class="product__description">{{ product.description }}</p>
                    
                    <div class="productOptions">
                        <div class="productOptions__option" v-for="option in product.options" :key="option.name">
                            <p>{{ option.name }}</p>
                            <div v-for="value in option.values" :key="value" :option="option">
                                <input type="radio" :id="value" :name="option.name" :value="value">
                                <label class="option__value" :for="value"> {{ value }}</label><br>
                            </div>
                        </div>
                        <input class="productOptions__quantity" type="number" :value="product.inputQuantity" :max="product.remainingQuantity" min="0">
                        <button @click="addToCart" class="addToCart">Ajouter au panier</button>
                    </div>
                
                </div>
                
                <div class="modal__product__details">
                </div>
            </div>
        </div>
    `,
    computed: {
        product: function() {
            return this.getProduct
        }
    },
    methods: {
        addToCart: function() {
            console.log('test')
        }
    }
})