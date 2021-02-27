export default {
    props: ['book'],
    template: `
    <section class="book-preview flex column align-center space-evenly">
        <div>
            <h2>{{book.title}}</h2>
            <img :src="book.thumbnail"/>
            <h3>{{formattedPrice}}</h3>
        </div>
        <router-link class="details" :to="'books/'+book.id">More details</router-link>
    </section>
    `,
    computed:{
        formattedPrice(){
            const currencyCode = this.book.listPrice.currencyCode;
            return (this.book.listPrice.amount .toLocaleString('us-US', { style: 'currency', currency: currencyCode }));

        }
    }
};
