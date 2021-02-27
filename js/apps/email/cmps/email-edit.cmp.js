import { emailService } from '../services/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
// import { utilService } from '../../../services/util.service.js'

export default{
    props:['mail'],
    template:`
    <section class="email-edit" >   
        <div class="email-edit-title flex space-between"><h2>New Message</h2><button class="close-edit-btn clean-btn" @click="closeEdit">X</button></div>
        <div class="email-edit-main">
        <form class=" flex column center" @submit.prevent="send"> 
        <p class="compose-to"><span> To </span> <input type="email" v-model="mail.from" required></p>
        <p class="compose-subject"><span>Subject </span><input type="text" v-model="mail.subject"></p>
        <p><textarea class="compose-body" type="text" v-model="mail.body" cols="50" rows="16"></textarea></p>
        <button class="compose-send clean-btn">Send</button>
        </form>
    </div>
    </section>
    `,
    methods:{
        send(){
         emailService.post(this.mail)
            .then((mail)=>{
            eventBus.$emit('mailComposed');
            eventBus.$emit('closeEdit');
            console.log('msg sent: '+mail)
        })
        },
        closeEdit(){
            eventBus.$emit('closeEdit')
        },
        setMailReply(mail){
            this.mail = mail
        },
        setNewMail(){
            this.mail = emailService.getEmptyMail() 
        }
    },
    created(){
        const subject = (this.mail.subject) ? `Re: ${this.mail.subject}` : this.mail.subject;
        const body = (this.mail.body) ? `\n\n\n\n\n... \n${this.mail.subject}` : this.mail.body;
        
        this.mail.subject = subject
        this.mail.body = body
    }
}