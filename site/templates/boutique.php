<?= snippet('header') ?>

    <cart
        :get-is-open="sharedProperties.cart.isOpen"
        :get-new-product="sharedProperties.cart.newProduct"
        @update-quantity="getCartQuantity"
    ></cart>

    <transition name="allProducts">
        <product-modal
            v-if="modalIsEmpty === false"
            :get-product="sharedProperties.modal.product"
        ></product-modal>
    </transition>

    <transition name="allProducts">
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

