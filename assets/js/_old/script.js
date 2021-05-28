import { Img, Load, StretchOnScroll, Data, String } from "../libraries/app.js";
import { Shop } from "./libraries/shop.js";
document.addEventListener('DOMContentLoaded', () => {

    const app = {
        btns: document.querySelectorAll('button, a'),
        cursor: {
            element: document.querySelector('.cursor'),
            stroke: document.querySelector('.stroke'),
            fill: document.querySelector('.fill'),
            animate: (xPos, yPos) => {
                app.cursor.element.style.left = (xPos - 25) + 'px'
                app.cursor.element.style.top = (yPos - 25) + 'px'
            },
            drop: () => {
                gsap.fromTo('.fill', {
                    attr: {r: 15},
                    autoAlpha: 1,
                }, {
                    attr: {r: 25},
                    duration: .7,
                    autoAlpha: 0,
                    ease: 'power3',
                    stagger: .1
                })
            }
        },
        responsiveDynamicStyles: selector => {
            const items = document.querySelectorAll(selector)
            let isActive = false
            if (window.innerWidth > 800) {
                isActive = true
                items.forEach(item => {
                    item.setAttribute('style', item.dataset.styles)
                })
            }
            
            window.addEventListener('resize', () => {
                if (window.innerWidth > 800 && isActive === false) {
                    isActive = true
                    items.forEach(item => {
                        item.setAttribute('style', item.dataset.styles)
                    })
                }
                if (window.innerWidth < 800 && isActive === true) {
                    isActive = false
                    items.forEach(item => {
                        item.style.width = ''
                        item.style.padding = ''
                        item.style.margin = ''
                        item.style.marginBottom = ''
                        item.style.alignItems = ''
                    })
                }
            })
        }
    }

    const header = {
        nav: {
            btn: document.querySelector('.navBtn'),
            bars: {
                first: document.querySelector('.navBtn__bar:first-child'),
                second: document.querySelector('.navBtn__bar:last-child')
            },

            toggle: () => {
                header.nav.toggleBars()
                header.nav.toggleHeight()
            },
            toggleBars: () => {
                header.nav.bars.first.classList.toggle('navBtn__bar--first-close')
                header.nav.bars.second.classList.toggle('navBtn__bar--second-close')
            },
            toggleHeight: () => {
                console.log('toggleHeight');
            }
        }
    }

    const home = {
        image: {
            animate: (xPos, yPos) => {

                gsap.to('.home__img', {
                    scale: ((xPos + yPos) / 3000) + 1,
                    ease: 'sine'
                })
            },
            open: () => {
                gsap.to('.home__img', {
                    scale: 2
                })
            }
        },
        text: {
            title: document.querySelector('.home__title'),
            subtitle: document.querySelector('.home_subtitle'),
            infos: document.querySelector('.home__infos')
        }
    }

    const shop = {
        addBtns: document.querySelectorAll('.add'),
        cart: {
            toggleBtn: document.querySelector('.cartBtn'),
            container: document.querySelector('.cart'),
            toggle: () => {
                shop.cart.container.classList.toggle('cart--open')
            }
        }
    }

    // =========================================== INITIALISATION
    Load.init('.content', '.content', 'fade')
    Img.fadeIn()

    // =========================================== INTERACTIONS
    header.nav.btn.addEventListener('click', () => {
        header.nav.toggle()
    })

    shop.cart.toggleBtn.addEventListener('click', () => {
        shop.cart.toggle()
    })

    Shop.init('.product', '.cart')

    shop.addBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // const product = String.removeAccent(btn.parentNode.querySelector('.product__title').textContent)
            // const author = String.removeAccent(btn.parentNode.querySelector('.product__author').textContent)
            // const name = `${product}, par ${author}`
            // const quantity = parseInt(document.querySelector('.product__quantity').value)
            // const price = parseInt(document.querySelector('.product__price').textContent)
            // const cart = document.querySelector('.cart__list')

            // Cart.add(name, quantity, price, cart)

        //     const siteUrl = document.body.dataset.url
        //     const authorName = btn.parentNode.querySelector('.product__author').textContent.toLowerCase().replace(' ', '-')
        //     const productName = btn.parentNode.querySelector('.product__title').textContent.toLowerCase().replace(' ', '-')
        //     const page = String.removeAccent(`${authorName}/${productName}`)
        //     const key = 'quantity'
        //     const oldValue = parseInt(document.querySelector('.product__quantity').getAttribute('max'))
        //     const value = oldValue - parseInt(document.querySelector('.product__quantity').value)
        //     Data.update(siteUrl, page, key, data)
        })
    })

    // document.addEventListener('mousemove', () => {
    //     let xPos = event.clientX,
    //         yPos = event.clientY
        
    //     home.image.animate(xPos, yPos)
    //     app.cursor.animate(xPos, yPos)
    // })

    // document.querySelector('.home__img').addEventListener('click', () => {
    //     home.image.open()
    // })

    // gsap.from('.home__title, .home__subtitle, .home__infos', {
    //     y: 5,
    //     opacity: 0,
    //     duration: .7,
    //     delay: 1,
    //     stagger: .7
    // })

    // gsap.to('.content',
    //     {
    //         opacity: 1,
    //         duration: .7
    //     }
    // )

    // app.btns.forEach(btn => {
    //     btn.addEventListener('mouseenter', () => {
    //         app.cursor.drop()
    //     })
    // })

    app.responsiveDynamicStyles('.row, .column, .block, .wrapper')

/* ====================
=======================
END
=======================
==================== */    
})