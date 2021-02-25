import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
  template: `
    <section v-if="mail" class="mail-details flex column">   
        <h1>{{mail.subject}}</h1>
        <p> {{mail.body}}</p>
        <button @click="onReply(mail)">Reply</button>
    </section>
    `,
  data() {
    return {
      mail: null,
    };
  },
  methods: {
    loadMail() {
      emailService.getById(this.currId()).then((mail) => (this.mail = mail));
    },
    currId() {
      return this.$route.params.emailId;
    },
    onReply(mail){
      eventBus.$emit('reply', mail)
    }
  },
  computed: {},
  created() {
    this.loadMail();
  },
};
