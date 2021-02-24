import emailInbox from './email-inbox.cmp.js'
import emailNavBar from '../cmps/email-nav-bar.cmp.js'
import emailEdit from '../cmps/email-edit.cmp.js'

export default{
    template:`
    <section class="email-app">   
        <header> this is the header</header>


        <div class="main-email-app">

        <email-nav-bar @editMail="openCompose"></email-nav-bar>
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
        openCompose(){
            this.editMail=true
        }
    },
    components:{
        emailInbox,
        emailNavBar,
        emailEdit
    }
}