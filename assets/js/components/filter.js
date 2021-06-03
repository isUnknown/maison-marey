const Filter = {
    props: ['filter'],
    data: function() {
        return {
            isOpen: false,
            target: document.querySelector(`#${this.filter.name}`),
            value: ''
        }
    },
    template: `
    <div class="filter" :id="filter.name">
        <h5 @click="this.toggleList" class="filter__name"><button>{{ filter.name }} :</button></h5>
            <h5 class="filter__tag"><button @click="clear">{{ this.value }} <span v-if="this.value !== ''">x</span></button></h5>
        <ul class="filter__tagsList" v-if="this.isOpen" :id="filter.name + 'List'">
            <li v-for="tag in filter.tags"><h5><button @click="activate(tag)">{{ tag }}</button></h5></li>
        </ul>
    </div>
    `,
    methods: {
        setHeight: function () {
            let container = document.querySelector('.filters')
            const height = window.getComputedStyle(container).getPropertyValue('height')
            container.style.height = height
        },
        toggleList: function() {
            this.isOpen ? this.closeList() : this.openList()
        },
        openList: function () {
            this.isOpen = true
            setTimeout(() => {
                const list = document.querySelector(`#${this.filter.name} ul`)
                const listHeight = parseInt(window.getComputedStyle(list).getPropertyValue('height'))

                const container = document.querySelector('.filters')
                const containerHeight = parseInt(window.getComputedStyle(container).getPropertyValue('height'))
                
                let newHeight = containerHeight + listHeight 

                container.style.height = `${newHeight}px`
            }, 5);
        },
        closeList: function() {
            const list = document.querySelector(`#${this.filter.name} ul`)
            const listHeight = parseInt(window.getComputedStyle(list).getPropertyValue('height'))

            const container = document.querySelector('.filters')
            const containerHeight = parseInt(window.getComputedStyle(container).getPropertyValue('height'))
            
            let newHeight = containerHeight - listHeight 

            container.style.height = `${newHeight}px`
            setTimeout(() => {
                this.isOpen = false
            }, 500);
        },
        activate: function(tag) {
            this.closeList()
            if (this.value !== '') {
                this.filter.tags.push(this.value)
            }
            this.value = tag
            this.filter.tags = this.filter.tags.filter(target => target !== tag)
        },
        clear: function() {
            this.filter.tags.push(this.value)
            this.value = ''
        }
    },
    mounted: function() {
        this.setHeight()
    },
    updated: function() {
        this.$emit('update-filters', {
            'name': this.filter.name,
            'value': this.value
        })
    }
}

export default Filter