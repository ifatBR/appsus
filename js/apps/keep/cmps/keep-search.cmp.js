import { eventBus } from '../../../services/event-bus.service.js';

export default{
    template:`
    <section class="keep-search">
        <input type="search" v-model="filterBy.txt" @input="setFilter" placeholder="search..."/>
    </section>
    `,
    data(){
        return{
            filterBy:{
                txt:''
            }
        }
    },
    methods:{
        setFilter(){
            eventBus.$emit('setFilter',this.filterBy)
        }
    }
}