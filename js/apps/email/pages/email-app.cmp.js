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
        <button class="burger-btn clean-btn" @click="toggleNavBar" ></button>
        <header class="email-header flex"> 
            <email-sort />
            <email-filter />
            <email-search />
        </header>
        
        <div class="main-email-app flex">
            <div class="main-screen" v-show="isNavBarOpen" @click="closeNavBar"></div>
            <email-nav-bar class="aside-nav-bar" @editMail="openEdit" :class="{'nav-bar-is-open':!isNavBarOpen, 'nav-bar-is-close':isNavBarOpen}"  @closeNavBar="closeNavBar"></email-nav-bar>
            <email-edit v-if="editMail" :mail="mailToCompose" />
            <router-view />

        </div>
    </section>
    `,
    data(){
        return{
            editMail:false,
            mailToCompose:null,
            isNavBarOpen:false,
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
        },
        toggleNavBar(){
            this.isNavBarOpen = !this.isNavBarOpen
        },
        closeNavBar(){
            this.isNavBarOpen=false
        },
        createMailByQuery(query){
            
        }
    },
    computed:{
        isShow(){
            return{isNavBarOpen:(!this.isNavBarOpen)}
        }
    },
    created(){
        eventBus.$on('closeEdit',this.closeEdit)
        eventBus.$on('reply',this.openReply)
        console.log(this.$route);
        if(this.$route.query.title || this.$route.query.txt) this.createMailByQuery(this.$route.query);
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