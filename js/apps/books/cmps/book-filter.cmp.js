export default {
    template: `
    <section class="filter-container flex space-evenly">
        <label>Search by title:
            <input  type="text" @input="setFilter" placeholder="Title" v-model="filterBy.title">
        </label>
        <div class="price-filter-container">
            <label>Price</label>
            <label>From:
                <input type="number" @input="setFilter" placeholder="0" v-model="filterBy.fromPrice">
            </label>
            <label>To:
                <input type="number" @input="setFilter" placeholder="0" v-model="filterBy.toPrice">
            </label>
        </div>
    </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: 0,
                toPrice: Infinity,
            },
        };
    },

    methods: {
        setFilter() {
            if(this.filterBy.fromPrice <0) this.filterBy.fromPrice = 0;
            if(this.filterBy.toPrice <=0) this.filterBy.toPrice = Infinity;
            this.$emit('filtered', this.filterBy);
        },
    },
};
