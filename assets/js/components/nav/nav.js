import NavMain from "./nav-main.js"
import NavLogo from "./nav-logo.js"
import { Data, Load } from "../../libraries/app.js"
import navBurger from "./nav-burger.js"

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const nav = new Vue({
            el: '#navigation',
            components: {
                'nav-main': NavMain,
                'nav-burger': navBurger,
                'nav-logo': NavLogo
            },
            data: {
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
                ]
            },
            methods: {
                test: function() {
                    console.log('test')
                }
            },
            mounted: function() {
                // Load.init('.content', '.content')
            }
        })
    }, 200)
})