import { Img, Styles } from './libraries/app.js'

document.addEventListener('DOMContentLoaded', () => {

    // =========================================== INITIALISATION
    Img.fadeIn()
    Styles.responsiveDynamicStyles('.row, .column, .block, .wrapper')
    if (document.querySelector('.content')) {
        document.querySelector('.content').style.opacity = 1
    }

    if (document.querySelector('.swiper-container') !== null) {
        setTimeout(() => {
            let swiper = new Swiper('.swiper-container', {
                direction: 'horizontal',
                loop: true,
                keyboard: true
            })
        }, 300);
    }

    // =========================================== DEBUG
})