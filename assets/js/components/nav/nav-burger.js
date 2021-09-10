const navBurger = {
    props: {
        pages: Array
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
                <a v-for="page in pages" href="page.url" :key="page.title" class="burgerNav__flap__pages">
                    <h1>{{ page.title }}</h1>
                </a>
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