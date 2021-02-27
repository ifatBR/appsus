import longText from '../cmps/long-text.cmp.js';
import { booksService } from '../services/books.service.js';
import bookReviews from '../cmps/book-reviews.cmp.js';

export default {
    template: `
    <div v-if="book" class="book-details main-container flex">
        <div class="paging-container">
            <router-link class="prev paging" :to="'/book/'+prevBookId">Prev</router-link>
            <router-link class="next paging" :to="'/book/'+nextBookId">Next</router-link>
        </div>
        <img :src="book.thumbnail"/>
        <router-link class="back" to="/book">Back</router-link>
        <div class="info">
            <h2>{{book.title}}</h2>
            <div><h3>Id: </h3> <p>{{book.id}}</p></div>
            <div><h3>Subtitle: </h3><p>{{book.subtitle}}</p></div>
            <div><h3>Author/s: </h3><p>{{formattedAuthor}}</p></div>
            <div><h3>Published: </h3><p>{{formattedDate}}</p></div>
            <div><h3>Page count: </h3><p>{{formattedPageCount}}</p></div>
            <div><h3>Language: </h3><p>{{formattedLang}}</p></div>
            <div>
                <h3>Description:</h3> 
                <long-text @click.native="toggleDescription" :txt="bookDesc"/>
            </div>
            <div>
                <h3>Categories: </h3>
                <p>{{formattedCats}}</p>
            </div>
            <div>
                <h3>Price: </h3>
                <p :class="priceColor">{{formattedPrice}}</p> 
                <img class="sale" src="../img/sale.png" v-if="book.listPrice.isOnSale"/>
            </div>            
        </div>
        <div class="reviews">
            <h2>Reviews</h2>
            <router-link class="lnk-review" :to="book.id+'/'+book.title+'/review'">Add review</router-link>
            <book-reviews @reload-book="updateBook" :bookId="book.id" :reviews="book.reviews"/>
        </div>
    </div>
    `,
    data() {
        return {
            isShortDesc: true,
            book: null,
            prevBookId:null,
            nextBookId:null
        };
    },
    methods: {
        toggleDescription() {
            this.isShortDesc = !this.isShortDesc;
        },
        loadBook(){
            const id = this.$route.params.bookId;
            return booksService.getById(id)
            .then((book) => this.book = book)
            .then(() => this.setNeighboreBooksIds());
        },
        updateBook(){
            this.loadBook();
        },
        setNeighboreBooksIds(){
            const prms = [];
            prms.push(booksService.getNeighborBookId(this.book.id, -1))
            prms.push(booksService.getNeighborBookId(this.book.id, 1))
            Promise.all(prms)
            .then(pagesIds =>{ 
                this.prevBookId = pagesIds[0].id
                this.nextBookId = pagesIds[1].id
            })    
        }
    },
    created() {
        console.log('dets');
        const id = this.$route.params.bookId;
        booksService.getById(id).then((book) => {
            this.book = book;
        })
        .then(() => this.loadBook());
    },
    watch:{
        '$route.params.bookId'(){
            this.loadBook()
        }
    },
    computed: {
        formattedAuthor() {
            return this.book.authors.join(', ');
        },

        formattedDate() {
            const yearsDiff = new Date().getFullYear() - this.book.publishedDate;
            const date = this.book.publishedDate;
            if (yearsDiff > 10) return date + ', Veteran book';
            if (yearsDiff < 1) return date + ', New!';
            return date;
        },

        formattedPageCount() {
            const pageCount = this.book.pageCount;
            if (pageCount > 500) return pageCount + ', Long reading';
            if (pageCount > 200) return pageCount + ', Decent reading';
            if (pageCount < 100) return pageCount + ', Light reading';
            return pageCount;
        },

        formattedCats() {
            return this.book.categories.join(', ');
        },

        formattedLang() {
            const lang = this.book.language;
            switch (lang) {
                case 'en':
                    return 'english';
                case 'he':
                    return 'hebrew';
                case 'sp':
                    return 'spanish';
            }
        },
        formattedPrice() {
            const currencyCode = this.book.listPrice.currencyCode;
            return this.book.listPrice.amount.toLocaleString('us-US', { style: 'currency', currency: currencyCode });
        },
        priceColor() {
            if (this.book.listPrice.amount > 150) return 'expensive';
            if (this.book.listPrice.amount < 20) return 'cheap';
        },
        bookDesc() {
            const desc = this.book.description;
            return this.isShortDesc && desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
        },
    },
    components: {
        longText,
        bookReviews
    },
};
