const NavLogo = {
    props: {
        rootUrl: String
    },
    template: `
        <a :href="rootUrl"><h1 class="header__logo">Maison<br>Marey</h1></a>
    `
}

export default NavLogo