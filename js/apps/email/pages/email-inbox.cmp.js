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
      filterBy: null,
      searchBy: null,
      sortBy: null,
    };
  },
  methods: {
    getMails() {
      emailService.query().then((mails) => (this.mails = mails)).then(()=>this.setSort('date'))
    },
    openMail(id) {
      emailService.getById(id).then((currMail) => console.log(currMail));
    },
    deleteMail(mailId) {
      emailService.remove(mailId).then(() => this.getMails());
    },
    starMail(mail) {
        mail.isStarred=!mail.isStarred;
        emailService.put(mail)
          .then(()=>eventBus.$emit('mailStarred', mail));
    },
    setFilter(filterBy) {
      const readOrUnread = filterBy.toLowerCase();
      this.filterBy = readOrUnread;
    },
    setSearch(searchBy) {
      this.searchBy = searchBy;
    },
    setSort(sortBy) {
      this.sortBy = sortBy;
    },
  },
  computed: {
    mailsToShow() {
      if (!this.filterBy && !this.searchBy && !this.sortBy) return this.mails;
      if (this.filterBy) {
        const val = this.filterBy === 'read' ? true : false;
        const mailsToShow = this.mails.filter((mail) => mail.isRead === val);
        return mailsToShow;
      }
      if (this.searchBy) {
        return searchService.searchByName(this.searchBy, this.mails);
      }
      if (this.sortBy) {
        if (this.sortBy === 'subject') {
          const mailsToShow = [...this.mails].sort(function (mail1, mail2) {
            return mail1.subject.localeCompare(mail2.subject);
          });
          return mailsToShow;
        }
        if (this.sortBy === 'date') {
          console.log(this.sortBy);
          const mailsToShow = [...this.mails].sort(function (mail1, mail2) {
            return mail2.sentAt - mail1.sentAt;
          });
          return mailsToShow
        }
      }
    },
  },
  created() {
    this.getMails();
    eventBus.$on('mailComposed', this.getMails);
    eventBus.$on('deleteMail', this.deleteMail);
    eventBus.$on('starMail', this.starMail);
    eventBus.$on('filtered', this.setFilter);
    eventBus.$on('searched', this.setSearch);
    eventBus.$on('sorted', this.setSort);
  },
  components: {
    emailList,
  },
};
