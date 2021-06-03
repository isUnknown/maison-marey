const ProductHeader = {
    props: {
        product: Object
    },
    template: `
        <div class="product__header">
            <h1 class="product__name">{{ product.name }}</h1>
            <p class="product__author">{{ product.author }}</p>
            <h4 class="product__price">{{ product.price }} €</h4>
            <p class="product__description">{{ product.description }}</p>
        </div>
    `
}

export default ProductHeader