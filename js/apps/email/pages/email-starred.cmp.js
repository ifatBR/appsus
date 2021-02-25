import { emailService } from '../services/email.service.js';
import { searchService } from '../services/email.search.service.js';
import emailList from '../cmps/email-list.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
  template: `
    <section>   
        <email-list @mailClicked="openMail" :mails="mailsToShow" class="email-main-container"></email-list>
    </section>
    `,
  data() {
    return {
      mails: null,
      searchBy:null
    };
  },
  methods: {
    getMails() {
      emailService.query()
      .then((mails) => {
          this.mails = mails.filter(mail=> mail.isStarred===true)
    });
    },
    openMail(id) {
      emailService.getById(id).then((currMail) => console.log(currMail));
    },
    deleteMail(mailId){
        emailService.remove(mailId)
            .then(()=>this.getMails())
    },
    setSearch(searchBy){
      this.searchBy= searchBy
    },
  },
  computed:{
    mailsToShow(){
      if (!this.searchBy) return this.mails;
      if(this.searchBy){
        return searchService.searchByName(this.searchBy,this.mails)
        }
    }
  },
  created() {
    this.getMails();
    eventBus.$on('mailComposed', this.getMails);
    eventBus.$on('mailStarred', this.getMails);
    eventBus.$on('deleteMail', this.deleteMail);
    eventBus.$on('searched', this.setSearch);
  },
  components: {
    emailList,
  },
};
