import { eventBus } from '../../../services/event-bus.service.js'

export default{
    template:`
            <section class="email-filter" @change="setFilter($event)">
                   <select class="input"> 
                       <option >Read</option>
                       <option >Unread</option>
                   </select>
            </section>
    `,
    methods:{
        setFilter(ev){
            eventBus.$emit('filtered',ev.target.value)
        }
    },
}