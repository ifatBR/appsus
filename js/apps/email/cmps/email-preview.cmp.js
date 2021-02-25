import { eventBus } from '../../../services/event-bus.service.js';

export default {
  props: ['mail'],
  template: `
    <section  class="mail-li flex" >   
            <span class="mail-subject">{{mail.name}}</span>
               <div class="mail-body flex space-between">
                    <span class="mail-body">{{mail.subject}}</span>
                    <span class="mail-date">{{getDate(mail.sentAt)}}</span>
                </div>
                <span @click.stop="StarMail(mail)" class="star"  :class="starColor"><i class="fal fa-star"></i></span>
                <button @click.stop="deleteMail(mail.id)">X</button>

    </section>
    `,
  methods: {
    deleteMail(id) {
      eventBus.$emit('deleteMail', id);
    },
    StarMail(mail){
      eventBus.$emit('starMail', mail);
    },
    getDate(timestamp) {
      const date = new Date(timestamp);
      const month = this.getMonth(date.getUTCMonth() + 1); //months from 1-12
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();
        const modfiedDate = year<2021 ? year+ ' '+month + ' ' + day : month + ' ' + day
      return modfiedDate;
    },
    getMonth(month){
        switch (month){
            case 1:  return 'Jan'
            case 2:  return 'Feb'
            case 3:  return 'Mar'
            case 4:  return 'Apr'
            case 5:  return 'May'
            case 6:  return 'Jun'
            case 7:  return 'Jul'
            case 8:  return 'Aug'
            case 9:  return 'Sep'
            case 10:  return 'Oct'
            case 11:  return 'Nov'
            case 12:  return 'Dec'
        }
      }
  },
  computed: {
    starColor(){
      return this.mail.isStarred ?  'starred' : 'not-starred'
    }
  },
};
