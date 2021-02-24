import { emailService } from '../services/email.service.js';
import emailPreview from './email-preview.cmp.js';

export default {
  props: ['mails'],
  template: `
    <section>   
        <ul class="mail-list clean-list">
            <li v-for="mail in mails" @click="mailClicked(mail.id)">
                 <router-link :to="'/email/'+mail.id"><email-preview :mail="mail" /></router-link>
            </li>
        </ul>
    </section>
    `,
  methods: {
    mailClicked(id) {
      this.$emit('mailClicked', id);
    },
  },
  components: {
    emailPreview,
  },
};
