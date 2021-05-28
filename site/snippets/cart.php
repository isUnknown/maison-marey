<div class="cart">
  <div class="cart__productWrapper" v-for="product in products" :key="product.id">
    <div v-if="product.selectedQuantity > 0" class="cart__product">
      <button @click="addToCart(product.id)">{{ product.id }} {{ product.selectedQuantity }} {{ product.totalPrice }}</button>
    </div>
  </div>
</div>