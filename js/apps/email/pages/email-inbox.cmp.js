import { emailService } from '../services/email.service.js'
import emailList from '../cmps/email-list.cmp.js'

export default{
    template:`
    <section>   
        <email-list @mailClicked="openMail" class="email-main-container"></email-list>
    </section>
    `,
    data(){
        return{
            // mails:null
        }
    },
    methods:{
        openMail(id){
            emailService.getById(id)
            .then((currMail)=>  console.log(currMail));
        }
    },
    // created(){
    //     this.getMails()
    // },
    components:{
        emailList
    }
}