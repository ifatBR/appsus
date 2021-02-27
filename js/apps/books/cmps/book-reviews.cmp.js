import { booksService } from '../services/books.service.js';


export default{
    props:['reviews','bookId'],
    template:`
    <section>
        <ul class="clean-list">
            <li  v-for="review in reviews" :key="review.id">
                <h3>Writte by: {{review.userName}}</h3>
                <button @click="removeReview(review)">X</button>
                <h5>Rating: {{review.rate}}</h5>
                <h4>Read at: {{review.readAt}}</h4>
                <p>{{review.txt}}</P>
            </li>
        </ul>
    </section>
    `,
    data(){
        return{
            readAt:null
        }
    },
    methods:{
       removeReview(review){
            booksService.removeReview(this.bookId,review)
            .then(() => this.$emit('reload-book'))
       }
    }

}