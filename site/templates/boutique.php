<?= snippet('header') ?>

<?= snippet('cart') ?>

<section class="products">
    <div class="product" v-for="product in products" :key="product.id">
        <div class="product__images">
            <img :src="product.cover" alt="">
        </div>
        <div class="product__infos">
            <h1 class="product__name">{{ product.name }}</h1>
            <h4 class="product__author">{{ product.author }}</h4>
            <h4 class="product__price">{{ product.price }}</h4>
            <p class="product__description">{{ product.description }}</p>
            <input autocomplete="off" type="number" class="product__quantity" v-model="product.inputQuantity" :max="product.remainingQuantity">
            <button @click="addToCart(product)" class="add">Ajouter</button>
        </div>
    </div>
</section>

<?= snippet('footer') ?>

