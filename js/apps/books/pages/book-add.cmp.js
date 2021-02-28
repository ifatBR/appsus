import { booksService } from '../services/books.service.js';
import googleBooks from '../cmps/google-books.cmp.js';
export default {
    template: `
    <section v-if="googleBooks" class="book-add-container">
        <div class="book-add">

            <label for="">Search book</label>  
            <form @submit.prevent="searchBooks">
                <input type="search" v-model="search"/>
                <button>Search</button>
            </form>
            <ul v-if="googleBooks" class="google-books-container">
                <google-books :search="search" :books="googleBooks"/>
            </ul> 
        </div>
    </section>
    `,
    data() {
        return {
            googleBooks: null,
            search: '',
        };
    },
    created(){
        console.log('add books');
    },
    methods:{
        searchBooks(){
            console.log('search');
            booksService.getGoogleBooks(this.search).then((books) => {
                this.googleBooks = books.items
                console.log('gbooks',this.googleBooks);
            });
        }
    },
    components: {
        googleBooks,
    },
};
