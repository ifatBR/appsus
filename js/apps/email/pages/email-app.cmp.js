import emailInbox from './email-inbox.cmp.js'
import emailNavBar from '../cmps/email-nav-bar.cmp.js'
import emailEdit from '../cmps/email-edit.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js';

export default{
    template:`
    <section class="email-app">   
        <header> this is the header</header>


        <div class="main-email-app">

        <email-nav-bar @editMail="openEdit"></email-nav-bar>
        <email-edit v-if="editMail" />
        <router-view />

        </div>
    </section>
    `,
    data(){
        return{
            editMail:false
        }
    },
    methods:{
        openEdit(){
            this.editMail=true
        },
        closeEdit(){
            this.editMail=false
        }
    },
    created(){
        eventBus.$on('closeEdit',this.closeEdit())
    },
    components:{
        emailInbox,
        emailNavBar,
        emailEdit
    }
}