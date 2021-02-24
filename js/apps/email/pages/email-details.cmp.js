import { emailService } from '../services/email.service.js';

export default {
  template: `
    <section v-if="mail">   
        <h1>{{mail.subject}}</h1>
        <p> {{mail.body}}</p>
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
  },
  computed: {},
  created() {
    this.loadMail();
  },
};
