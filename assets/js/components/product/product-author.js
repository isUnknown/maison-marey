const Author = {
    props: {
        author: Object
    },
    template: `
            <div class="modal__section modal__author">
                <div class="modal__authorWrapper">
                    <header>
                        <h1>{{ author.name }}</h1><a :href="author.page" class="see">portrait</a>
                    </header>
                    <div class="modal__author__main">
                        <img :src="author.cover" class="modal__author__cover"/>
                        <div class="modal__author__text">
                            <p class="modal__author__tags">
                                Matière(s) : {{ author.materials }}<br />
                                Objets : {{ author.itemsTypes }}
                            </p>
                            <p class="modal__author__pitch" v-html="author.pitch">
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    `
}

export default Author