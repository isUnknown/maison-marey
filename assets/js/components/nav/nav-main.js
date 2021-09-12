const NavMain = {
    props: {
        pages: Object
    },
    template: `
        <div class="mainNav">
            <a v-for="page in pages" :href="page.url" class="nav__item"><h3>{{ page.content.title }}</h3></a>
        </div>
    `
}

export default NavMain