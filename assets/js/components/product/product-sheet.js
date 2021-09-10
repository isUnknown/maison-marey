import ProductHeader from './product-header.js'

const ProductSheet = {
    props: {
        product: Object
    },
    components: {
        'product-header': ProductHeader
    },
    template: `
        <div class="product" v-if="product.isVisible" :key="product.id">
            <div class="product__images">
                <img :src="product.images[0]" alt="">
            </div>
            <div class="product__infos">
                <product-header
                    :product="product"
                ></product-header>
                <a :href="product.url" @click.prevent="open"><button class="see">shop</button></a>
            </div>
        </div>
    `,
    methods: {
        open: function() {
            this.$emit('open-product', this.product)
        }
    }
}

export default ProductSheet