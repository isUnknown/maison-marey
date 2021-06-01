Vue.component('product-sheet', {
    props: {
        product: Object
    },
    template: `
        <div class="product" v-if="product.isVisible" :key="product.id">
            <div class="product__images">
                <img :src="product.cover" alt="">
            </div>
            <div class="product__infos">
                <h1 class="product__name">{{ product.name }}</h1>
                <p class="product__author">{{ product.author }}</p>
                <h4 class="product__price">{{ product.price }} €</h4>
                <p class="product__description">{{ product.description }}</p>
                <a :href="product.url" @click.prevent="open"><button class="see">voir</button></a>
            </div>
        </div>
    `,
    methods: {
        open: function() {
            this.$emit('open-product', this.product)
        }
    }
})