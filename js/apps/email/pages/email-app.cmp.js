import emailInbox from './email-inbox.cmp.js'
import emailNavBar from '../cmps/email-nav-bar.cmp.js'
import emailEdit from '../cmps/email-edit.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailSearch from '../cmps/email-search.cmp.js'
import emailSort from '../cmps/email-sort.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js';

export default{
    template:`
    <section class="email-app">   
        <header class="email-header flex"> 
            <email-sort />
            <email-filter />
            <email-search />
        </header>

        <div class="main-email-app">
        <email-nav-bar @editMail="openEdit" ></email-nav-bar>
        <email-edit v-if="editMail" :mail="mailToCompose" />
        <router-view />

        </div>
    </section>
    `,
    data(){
        return{
            editMail:false,
            mailToCompose:null
        }
    },
    methods:{
        openEdit(){
            this.mailToCompose={
                    to:'',
                    subject:'',
                    body:''
                },
            this.editMail=true
        },
        openReply(mail){
            this.mailToCompose= mail
            this.editMail=true
        },
        closeEdit(){
            this.editMail=false
        }
    },
    created(){
        eventBus.$on('closeEdit',this.closeEdit)
        eventBus.$on('reply',this.openReply)
    },
    components:{
        emailInbox,
        emailNavBar,
        emailEdit,
        emailFilter,
        emailSearch,
        emailSort
    }
}