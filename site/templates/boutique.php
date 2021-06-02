<?= snippet('header') ?>

    <cart
        :get-total-quantity="totalQuantity"
        :get-products="products"
        :get-is-open="sharedProperties.cart.isOpen"
    ></cart>

    <transition name="fade">
        <product-modal
            @add-to-cart="addToCart"
            v-if="modalIsEmpty === false"
            :get-product="sharedProperties.modal.product"
        ></product-modal>
    </transition>

    <transition name="fade">
        <transition-group 
            v-if="modalIsEmpty"
            name="products" 
            tag="section" 
            class="products" 
            data-filters='<?= $filters ?>'
        >
            <product-sheet
                v-for="product in filteredProducts"
                :product="product"
                :key="product.id"
                @open-product="openModal"
            ></product-sheet>
        </transition-group>
    </transition>

<?= snippet('footer') ?>

