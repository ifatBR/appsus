import { emailService } from '../services/email.service.js';
import emailPreview from './email-preview.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
  props: ['mails'],
  template: `
    <section class="email-list">   
      <ul class="clean-list flex column">
        <li class="email-title flex">
          <span class="email-title-del">Del</span>
          <span class="email-title-star">Star</span>
          <span class="email-title-tag">Tag</span>
          <span class="email-title-name">Name</span>
          <span class="email-title-subject">Subject</span>
          <span class="email-title-date">Date</span>
        </li>
        <li v-for="mail in mails" @click="getLink(mail.id), mailClicked(mail, mail.id)" :class="{ 'mail-read' : mail.isRead}">
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
    // computed:{
      // isRead(){
      //   console.log(this.mail);
      //   if (this.mail.isRead) return 'mail-read'
      // }
    // }
    // deleteMail(id) {
    //   eventBus.$emit('deleteMail', id);
    // },
  },
  
  components: {
    emailPreview,
  },
};
