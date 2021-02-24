import { emailService } from '../services/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js';

export default{
    template:`
    <section class="email-edit flex column align-center">   
        new mail
        <form @submit.prevent="send"> 
        <p> To <input type="email" v-model="compose.to"></p>
        <p>Subject <input type="text" v-model="compose.subject"></p>
        <p><textarea type="text" v-model="compose.body" cols="40" rows="10"></textarea></p>
        <button>Send</button>
        </form>
    </section>
    `,
    data(){
        return{
            compose:{
                to:'',
                subject:'',
                body:''
            }
        }
    },
    methods:{
        send(){
         emailService.post(this.compose)
            .then((mail)=>{
            eventBus.$emit('mail-composed');
            console.log('msg sent: '+mail)
        })
        }
    },
    components:{
        // emailInbox,
        // emailNavBar
    }
}