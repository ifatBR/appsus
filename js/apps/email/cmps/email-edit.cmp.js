import { emailService } from '../services/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
// import { utilService } from '../../../services/util.service.js'

export default{
    props:['mail'],
    template:`
    <section class="email-edit" >   
        <button class="clean-btn" @click="closeEdit">X</button>
        new mail
        <form class=" flex column align-center" @submit.prevent="send"> 
        <p> To <input @reply="value='aa'" type="email" v-model="mail.from" required></p>
        <p>Subject <input type="text" v-model="mail.subject"></p>
        <p><textarea type="text" v-model="mail.body" cols="40" rows="10"></textarea></p>
        <button class="clean-btn">Send</button>
        </form>
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