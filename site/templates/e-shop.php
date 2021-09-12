<?= snippet('header') ?>

    <cart
        @toggle-cart="store.state.isCartOpen"
        :get-total-quantity="totalQuantity"
        :get-products="products"
    >
    </cart>

    <transition name="fade">
        <product-modal
            v-if="modalIsEmpty === false"
            :get-product="store.state.modal"
            :delivery="delivery">
        </product-modal>
    </transition>

    <transition name="fade">
        <transition-group 
            v-if="modalIsEmpty"
            name="products" 
            tag="section" 
            class="products" 
            data-filters='<?= $filters ?>'>
            
                <product-sheet
                    v-for="product in filteredProducts"
                    :product="product"
                    :key="product.id"
                    @open-product="openModal">
                </product-sheet>
        </transition-group>
    </transition>

<?= snippet('footer') ?>

