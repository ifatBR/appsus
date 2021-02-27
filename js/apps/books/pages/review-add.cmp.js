import { booksService } from '../services/books.service.js';
import { eventBus } from '../../../services/event-bus.service.js';


export default{
    template:`
        <section class="add-review-container main-container">
            <form class="add-review flex column align-center justify-center" @submit.prevent="addReview">
                
                <div class="flex">
                    <div class="user-info flex column space-between">
                        <div>
                            <label for="">You name</label>
                            <input ref="nameInput" v-model="review.userName" type="text" placeholder="Full name"/>
                        </div>
                        <div>
                            <label for="">Rate book</label>
                            <div class="rate-container flex space-between">
                                <button type="button" @click="changeRating(+1)">+</button>
                                <h3>{{review.rate}}</h3>
                                <button type="button" @click="changeRating(-1)">-</button>
                            </div>

                        </div>
                        <div>
                            <label for="">Read at</label>
                            <input v-model="review.readAt" type="date"/>
                        </div>
                        <div class="button-container">
                            <button class="submit">Submit</button>
                            <button class="close" @click="backToBook">Close</button>
                        </div>
                    </div>
                    <div class="user-review flex column">
                    <h2>{{bookTitle}}</h2>
                        <label for="">Your review:</label>
                        <textarea type="textarea" v-model="review.txt" rows="20" cols="50" name="review-txt"></textarea>
                    </div>
            
                </div>
              
            </form>
        </section>
    `,
    data(){
        return{
            rate:1,
            review:null,
            bookTitle:null
        }
    },
    methods:{
        changeRating(diff){
            if(diff<0 && this.review.rate===1 || diff >0 && this.review.rate===5) return;
            this.review.rate+=diff;
        },

        addReview(){
            if(!this.review.txt) return;
            booksService.saveReview(this.$route.params.bookId, this.review)
            .then(() => {
                const msg = {
                    isSuccess:true,
                    txt:'Review has been added successfuly'
                }
                eventBus.$emit('show-msg',msg)
        })
            .catch(() => {
                const msg = {
                    isSuccess:true,
                    txt:'Review adding failed'
                }
                eventBus.$emit('show-msg',msg)
        })
            .then(() => this.backToBook())
            
        },
        
        backToBook(){
            this.$router.push('/book/'+this.$route.params.bookId)
        }
    },
    mounted(){
        this.$refs.nameInput.focus()
    },
    created(){
        this.review = booksService.getEmptyReview();
        this.bookTitle = this.$route.params.bookTitle;
    }
}