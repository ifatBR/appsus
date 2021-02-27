import bookPreview from './book-preview.cmp.js';

export default {
    props: ['books'],
    template: `
    <ul class="book-list clean-list grid justify-center">
        <li v-for="book in books"  :key="book.id" >
        <book-preview :book="book" @click.native="setSelected(book.id)"/>   
        </li>
    </ul>
    `,
    components: {
        bookPreview,
    },
    methods:{
        setSelected(bookId){
            this.$emit('selected', bookId)
        }
    }
};
