import { booksService } from '../services/books.service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookAdd from './book-add.cmp.js'

export default {
    template: `
    <main class="book-container">
            <router-link  to="books/addbooks" exact>Add Books</router-link>
            <book-filter @filtered="setFilter"/>
            <book-list :books="booksToShow" @selected="selectBook"/>
    </main>
    `,
    data() {
        return {
            books: null,
            filterBy: null,
            selectedBook: null,
        };
    },
    created(){
        this.loadBooks();
    },

    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const filteredBooks = this.books.filter((book) => {
                return (
                    book.listPrice.amount > this.filterBy.fromPrice &&
                    book.listPrice.amount < this.filterBy.toPrice &&
                    book.title.toLowerCase().includes(this.filterBy.title.toLowerCase())
                );
            });

            return filteredBooks;
        },
    },
    methods: {
        loadBooks() {
            booksService.query().then((books) => (this.books = books));
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },

        selectBook(bookId) {
            this.selectedBook = this.books.find((book) => book.id === bookId);
        },
    },
    components: {
        bookList,
        bookFilter,
        bookAdd
    },
};
