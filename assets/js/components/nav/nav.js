import NavMain from "./nav-main.js"
import NavLogo from "./nav-logo.js"
import navBurger from "./nav-burger.js"
        
const Nav = {
    props: {
        rootUrl: String,
        navPages: Object
    },
    template: `
        <header class="header">
            <nav-burger
                :pages="navPages"
            ></nav-burger>

            <nav-logo
                :root-url="rootUrl"
            ></nav-logo>

            <nav-main
                :pages="navPages"
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
                url: 'http://maisonmarey.fr/v2/boutique'
            },
            {
                title: 'Présentation',
                url: 'http://maisonmarey.fr/v2/presentation'
            },
            {
                title: 'Artisans',
                url: 'http://maisonmarey.fr/v2/artisans'
            },
            {
                title: 'Expositions',
                url: 'http://maisonmarey.fr/v2/expositions'
            },
            {
                title: 'Initiations',
                url: 'http://maisonmarey.fr/v2/initiations'
            },
            {
                title: 'Contact',
                url: 'http://maisonmarey.fr/v2/contact'
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