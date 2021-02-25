import { emailService } from '../services/email.service.js';
import emailList from '../cmps/email-list.cmp.js';
import { searchService } from '../services/email.search.service.js';
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
      filterBy:null,
      searchBy:null
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
    },
    setFilter(filterBy){
      const readOrUnread= filterBy.toLowerCase()
      this.filterBy= readOrUnread
    },
    setSearch(searchBy){
      this.searchBy= searchBy
    },

  },
  computed:{
    mailsToShow(){
      if(!this. filterBy && !this.searchBy) return this.mails;
      if (this. filterBy){const val = this.filterBy==='read' ? true : false
      const mailsToShow = this.mails.filter(mail=> mail.isRead===val)
      return mailsToShow
    }
    if(this.searchBy){
      // const searchedStr = this.searchBy.toLowerCase()
      // console.log(searchedStr);
      // const mailsToShow = this.mails.filter(({subject,body})=> subject.toLowerCase().includes(searchedStr)||body.toLowerCase().includes(searchedStr))
      // return mailsToShow
      return searchService.searchByName(this.searchBy,this.mails)
      }
    }
  },
  created() {
    this.getMails();
    eventBus.$on('mailComposed', this.getMails);
    eventBus.$on('deleteMail', this.deleteMail);
    eventBus.$on('filtered', this.setFilter);
    eventBus.$on('searched', this.setSearch);
    
  },
  components: {
    emailList,
  },
};
