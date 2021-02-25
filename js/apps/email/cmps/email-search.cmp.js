import { eventBus } from "../../../services/event-bus.service.js"

export default{
    template:`
            <section  class="email-search">
                    <input type="text" placeholder="Search.." v-model="searchBy.byName" @input="setSearch" class="input">
            </section>
    `,
    data(){
        return{
            searchBy:{
                byName: '',
            }
        }
    },
    methods:{
        setSearch(){
            eventBus.$emit('searched', this.searchBy.byName)
        }
    }
}