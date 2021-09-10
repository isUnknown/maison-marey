import NavMain from "./nav-main.js"
import NavLogo from "./nav-logo.js"
import navBurger from "./nav-burger.js"
        
const Nav = {
    template: `
        <header class="header">
            <nav-burger
                :pages="pages"
            ></nav-burger>

            <nav-logo></nav-logo>

            <nav-main
                :pages="pages"
            ></nav-main>

            <div></div>
        </header>
    `,
    components: {
        'nav-main': NavMain,
        'nav-burger': navBurger,
        'nav-logo': NavLogo
    },
    data: function () {
        return {
            pages: [
            {
                title: 'E-SHOP',
                url: 'http://localhost:8888/maison-marey/boutique'
            },
            {
                title: 'Présentation',
                url: 'http://localhost:8888/maison-marey/presentation'
            },
            {
                title: 'Artisans',
                url: 'http://localhost:8888/maison-marey/artisans'
            },
            {
                title: 'Expositions',
                url: 'http://localhost:8888/maison-marey/expositions'
            },
            {
                title: 'Initiations',
                url: 'http://localhost:8888/maison-marey/initiations'
            },
            {
                title: 'Contact',
                url: 'http://localhost:8888/maison-marey/contact'
            }
        ]}
    },
    methods: {
        test: function() {
            console.log('test')
        }
    }
}

export default Nav