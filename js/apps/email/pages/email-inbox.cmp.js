import { emailService } from '../services/email.service.js';
import emailList from '../cmps/email-list.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
  template: `
    <section>   
        <email-list @mailClicked="openMail" :mails="mails" class="email-main-container"></email-list>
    </section>
    `,
  data() {
    return {
      mails: null,
    };
  },
  methods: {
    getMails() {
      emailService.query().then((mails) => (this.mails = mails));
    },
    openMail(id) {
      emailService.getById(id).then((currMail) => console.log(currMail));
    },
    deleteMail(mailId){
        emailService.remove(mailId)
            .then(()=>this.getMails())
    }
  },
  created() {
    this.getMails();
    eventBus.$on('mailComposed', this.getMails);
    eventBus.$on('deleteMail', this.deleteMail);
  },
  components: {
    emailList,
  },
};
