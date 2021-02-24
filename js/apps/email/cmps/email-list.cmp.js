import { emailService } from '../services/email.service.js'

export default{
    template:`
    <section>   
        <ul class="mail-list clean-list">
            <li v-for="mail in mails" @click="mailClicked(mail.id)" class="mail-li flex">
                 <span class="mail-subject">{{mail.subject}}</span>
               <div class="mail-body flex space-between">
                    <span class="mail-body">{{mail.body}}</span>
                    <span class="mail-date">{{mail.sentAt}}</span>
                </div>
            </li>
        </ul>
    </section>
    `,
    data(){
        return{
            mails:null
        }
    },
    methods:{
        getMails(){
            emailService.query()
                .then((mails)=>this.mails = mails)
        },
        mailClicked(id){
            this.$emit('mailClicked',id)
        }
    },
    created(){
        this.getMails()
    }
}