import { emailService } from '../services/email.service.js'
// import { eventBus } from '../../../services/event-bus.service.js';
import { eventBus } from '../../../services/event-bus.service.js'

export default{
    template:`
    <section class="email-edit">   
        <button class="clean-btn" @click="closeEdit">X</button>
        new mail
        <form class=" flex column align-center" @submit.prevent="send"> 
        <p> To <input type="email" v-model="compose.to"></p>
        <p>Subject <input type="text" v-model="compose.subject"></p>
        <p><textarea type="text" v-model="compose.body" cols="40" rows="10"></textarea></p>
        <button class="clean-btn">Send</button>
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
            eventBus.$emit('mailComposed');
            console.log('msg sent: '+mail)
        })
        },
        closeEdit(){
            eventBus.$emit('closeEdit')
        }
    },
    components:{
        // emailInbox,
        // emailNavBar
    }
}