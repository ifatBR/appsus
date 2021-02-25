import { emailService } from '../services/email.service.js';
import emailPreview from './email-preview.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
  props: ['mails'],
  template: `
    <section>   
        <ul class="email-list clean-list flex column">
            <li v-for="mail in mails" @click="getLink(mail.id), mailClicked(mail, mail.id)">
                 <!-- <router-link :to="'/email/'+mail.id"><email-preview :mail="mail" /></router-link> -->
                 <email-preview :mail="mail" />

            </li>
        </ul>
    </section>
    `,
  methods: {
    getLink(id){
      return this.$router.push(`/email/${id}`)
    },
    mailClicked(mail, id) {
      console.log(mail);
      mail.isRead=true;
      emailService.put(mail)
        .then(()=>eventBus.$emit('mailClicked', id));
    },
    // deleteMail(id) {
    //   eventBus.$emit('deleteMail', id);
    // },
  },
  
  components: {
    emailPreview,
  },
};
