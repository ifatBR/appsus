import { eventBus } from '../../../services/event-bus.service.js'
import { emailService } from '../services/email.service.js'

export default{
    template:`
    <nav class="aside-nav-bar flex column">


       <button @click="$emit('editMail')" class="compose-btn clean-btn">COMPOSE</button>

        <router-link @click.native="closeNav" to="/email/inbox" :class="{marked: getPath==='inbox'}">Inbox<span class="unread-count">({{unreadCount}})</span></router-link>
        <router-link @click.native="closeNav" to="/email/starred" :class="{marked: getPath==='starred'}">Starred</router-link>
        <router-link @click.native="closeNav" to="/email/sent" :class="{marked: getPath==='sent'}">Sent</router-link>
        <router-link @click.native="closeNav" to="/email/trash" :class="{marked: getPath==='trash'}">Trash</router-link>
    </nav>
    `,
    data(){
        return{
            unreadCount:null,
            path: null
        }
    },
    methods:{
        getCount(){
            emailService.query()
                .then(mails=>{
                    return mails.filter(mail=>mail.isRead===false)
                })
                .then(unreadMails=>this.unreadCount= unreadMails.length)
        },
        closeNav(){
            this.$emit('closeNavBar')
        }
    },
    computed:{
        getPath(){
            if (this.$route.path.includes('inbox') ) return 'inbox'
            if (this.$route.path.includes('starred') ) return 'starred'
            if (this.$route.path.includes('sent') ) return 'sent'
            if (this.$route.path.includes('trash') ) return 'trash'
        },
       
    },
    created(){
        this.getCount()
        eventBus.$on('mailClicked',this.getCount)
    }
}