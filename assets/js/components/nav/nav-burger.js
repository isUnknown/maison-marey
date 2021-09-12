const navBurger = {
    props: {
        pages: Object
    },
    data: function() {
        return {
            isOpen: false
        }
    },
    template: `
        <nav class="burgerNav" :class="{ open: isOpen }">
            <button class="burgerNav__icon" @click="toggle">
                <span class="burgerNav__icon__bars--up"></span>
                <span class="burgerNav__icon__bars--middle"></span>
                <span class="burgerNav__icon__bars--down"></span>
            </button>
            <div class="burgerNav__flap" :class="{ open: isOpen }">
                <div class="burgerNavWrapper">
                    <a v-for="page in pages" :href="page.url" :key="page.title" class="nav__item">
                        <h3>{{ page.content.title }}</h3>
                    </a>
                </div>
            </div>
        </nav>
    `,
    methods: {
        toggle: function() {
            this.isOpen = !this.isOpen
        }
    }
}

export default navBurger