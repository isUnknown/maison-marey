<?= snippet('header') ?>

<?= snippet('cart') ?>

<section class="products">
    <div class="product" v-for="product in products" v-if="product.isVisible" :key="product.id">
        <div class="product__images">
            <img :src="product.cover" alt="">
        </div>
        <div class="product__infos">
            <h1 class="product__name">{{ product.name }}</h1>
            <p class="product__author">{{ product.author }}</p>
            <h4 class="product__price">{{ product.price }} €</h4>
            <p class="product__description">{{ product.description }}</p>
            <div class="addWrapper" v-if="getRemainingQuantity(product) > 0">
                <input autocomplete="off" type="number" class="product__quantity" v-model="product.inputQuantity" :max="getRemainingQuantity(product)">
                <button @click="addToCart(product)" class="add">Ajouter</button>
            </div>
            <div class="orderMessage" v-if="getRemainingQuantity(product) === 0">
                <p>Il n'y a plus d'article en stock.</p>
                <p>Ce n'est pas grave, <a href="#">passez commande !</a></p>
            </div>
        </div>
    </div>
</section>

<?= snippet('footer') ?>

