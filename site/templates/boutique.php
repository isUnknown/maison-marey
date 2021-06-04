<?= snippet('header') ?>

    <cart
        @toggle-cart="toggleCart"
        @clean-cart-order="cleanCart"
        :get-total-quantity="totalQuantity"
        :get-products="products"
        :get-is-open="sharedProperties.cart.isOpen">
    </cart>

    <transition name="fade">
        <product-modal
            v-if="modalIsEmpty === false"
            :get-product="sharedProperties.modal.product"
            :get-selection="sharedProperties.modal.selection">
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

