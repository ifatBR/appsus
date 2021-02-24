
export default{
    props:['txt'],
    template:`
            <section class="book-description">
                <p v-if="!isAllDescShown">Description: {{getDescription}}</p>
                <p v-else>Description: {{txt}}</p>
                <button v-if="txt.length>100" @click="toggleSpan">Read <span>{{moreOrLess}}</span>...</button>
            </section>
    `,
    data(){
        return{
            isAllDescShown:false,
        }
    },
    methods:{
        toggleSpan(){
            this.isAllDescShown=!this.isAllDescShown
        }
    },
    computed:{
        getDescription(){
            const desc = this.txt.length <=100 ? this.txt : `${this.txt.substring(0,99)}...`
            return desc;
        },
        moreOrLess(){
            return this.isAllDescShown ? 'Less' : 'More';
        }
        
    }
}