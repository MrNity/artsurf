new Vue({
    el: '#app',
    data: {
        page: 1,
        beers: [],
        showButton: false,
        textButton: 'Show next',
        id: 0,
        newName: '',
        newDescription: '',
    },
    methods: {
        GetBeers(page) {
            this.textButton = 'loading'
            axios.get(`https://api.punkapi.com/v2/beers?page=${this.page}&limit=25`).then(response => {
                let beers = response.data
                if (beers.length == 0) {
                    this.showButton = false
                } else {
                    this.showButton = true
                }
                this.beers = this.beers.concat(beers)
                this.textButton = 'Show Next'
            })
            .catch(error => {
                console.error(error)
            })
        },
        NextPage() {
            this.page = this.page + 1
            this.GetBeers(this.page)
        },
        Delete(id) {
            let beer = this.beers.findIndex(b => b.id == id)
            this.beers.splice(beer, 1)
        },
        Edit(id) {
            let beer = this.beers.findIndex(b => b.id == id)
            this.beers[beer].name = this.newName
            this.beers[beer].description = this.newDescription
            this.newName = ''
            this.newDescription = ''
            this.id = 0
        }
    },
    mounted: function () {
        this.GetBeers()
    }
})