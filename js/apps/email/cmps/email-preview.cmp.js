import { eventBus } from '../../../services/event-bus.service.js';

export default{
    props:['mail'],
    template:`
    <section  class="mail-li flex" >   
            <span class="mail-subject">{{mail.subject}}</span>
               <div class="mail-body flex space-between">
                    <span class="mail-body">{{mail.body}}</span>
                    <span class="mail-date">{{mail.sentAt}}</span>
                </div>
                <button @click.stop="deleteMail(mail.id)">X</button>

    </section>
    `,
    methods:{
        deleteMail(id){
            eventBus.$emit('deleteMail', id)
        }

    }
}