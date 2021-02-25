import { eventBus } from '../../../services/event-bus.service.js'

export default{
    template:`
            <section class="email-sort" @change="setSort($event)">
                   <select class="input">
                       <option >date</option>
                       <option >subject</option>
                   </select>
            </section>
    `,
    methods:{
        setSort(ev){
            eventBus.$emit('sorted',ev.target.value)
        }
    },
}