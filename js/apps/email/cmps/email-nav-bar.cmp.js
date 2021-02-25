import { eventBus } from '../../../services/event-bus.service.js'
import { emailService } from '../services/email.service.js'

export default{
    template:`
    <nav class="aside-nav-bar flex column">

       <button @click="$emit('editMail')" class="compose-btn clean-btn">COMPOSE</button>

        <router-link to="/email/inbox">Inbox<span class="unread-count">({{unreadCount}})</span></router-link>
        <router-link to="/email/starred">Starred</router-link>
        <router-link to="/email/sent">Sent</router-link>
        <router-link to="/email/trash">Trash</router-link>
    </nav>
    `,
    data(){
        return{
            unreadCount:null
        }
    },
    methods:{
        getCount(){
            emailService.query()
                .then(mails=>{
                    return mails.filter(mail=>mail.isRead===false)
                })
                .then(unreadMails=>this.unreadCount= unreadMails.length)
        }
    },
    created(){
        this.getCount()
        eventBus.$on('mailClicked',this.getCount)
    }
}