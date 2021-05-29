<div class="cart" :class="{open: cart.isOpen}">
  <div class="cart__product" v-for="product in cart.products" :key="product.id">
    <div>{{ product.name }}, par {{product.author}}. Quantité : {{ product.quantity }}. Prix : {{ getSelectionPrice(product) }} €</div>
  </div>
  <div v-if="totalQuantity > 0" class="totalPrice">Total : {{ totalPrice }} €</div>
  <button @click="cleanCart">Vider le panier</button>
</div>