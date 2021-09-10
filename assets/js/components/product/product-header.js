const ProductHeader = {
    props: {
        product: Object
    },
    template: `
        <div class="product__header">
            <h2 class="product__name">{{ product.name }}</h2>
            <p class="product__author">{{ product.author }}</p>
            <h4 class="product__price">{{ product.price }} €</h4>
            <p class="product__description">{{ product.description }}</p>
        </div>
    `
}

export default ProductHeader