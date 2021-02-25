import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

const EMAIL_KEY = 'mails';
const gMails = [
  {
    id: utilService.makeId(),
    subject: 'כעת במבצע: פריטים ??? ב 59 ש"ח! תסתגננו',
    body: 'הגיע הזמן לקבל את הסגנונות הכי חמים שלנו. SHEIN בטל את הרישום | הצג בדפדפ',
    to:'me@gmail.com',
    name:'SHEIN',
    from:'shein@edm.il.shein.com',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1551133930594,
    isStarred:false
  },
  {
    id: utilService.makeId(),
    subject: 'ELHANAN and 60 others made changes in your shared folders',
    body: 'Activity in Shared Folders Here\'s what happened in your shared folders last week',
    to:'me@gmail.com',
    name:'Dropbox',
    from:'no-reply@dropboxmail.com',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1551133652187,
    isStarred:false

  },
  {
    id: utilService.makeId(),
    subject: 'See more jobs like Matific - Full Stack Engineer',
    body: 'Search for more related jobs Full Stack Engineer jobs Jobs at Matific Jobs in Ramat Gan, Tel Aviv, Israel Search other jobs',
    to:'me@gmail.com',
    name:'LinkedIn ',
    from:'jobs-noreply@linkedin.com',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1552593930594,
    isStarred:false

  },
  {
    id: utilService.makeId(),
    subject: 'Hiii! how are you?',
    body: 'Hii!! I just wanted to check how are you today friend :) .',
    to:'me@gmail.com',
    name:'Dana',
    from:'dana@gmail.com',
    isRead: true,
    isSent: false,
    isDeleted: false,
    sentAt: 1553593930594,
    isStarred:false

  },
  {
    id: utilService.makeId(),
    subject: 'Wassap?',
    body: 'Pick up!',
    to:'me@gmail.com',
    name:'MOM',
    from:'muki@gmail.com',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1551133930594,
    isStarred:false

  },
  {
    id: utilService.makeId(),
    subject: 'New Sale In Renuar!!!!',
    body: 'go to our site to be first to get our sale cloths',
    to:'me@gmail.com',
    name:'RENUAR',
    from:'muki@gmail.com',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1551133652187,
    isStarred:false

  },
  {
    id: utilService.makeId(),
    subject: 'have you watched TV today?',
    body: 'check out the new show!',
    to:'me@gmail.com',
    name:'Cellcom',
    from:'muki@gmail.com',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1552593930594,
    isStarred:false

  },
  {
    id: utilService.makeId(),
    subject: 'New Terms',
    body: 'Google has new security terms. please check them out.',
    to:'me@gmail.com',
    name:'Google',
    from:'muki@gmail.com',
    isRead: true,
    isSent: false,
    isDeleted: false,
    sentAt: 1553593930594,    
    isStarred:false

    
  },  {
    id: utilService.makeId(),
    subject: 'כעת במבצע: פריטים ??? ב 59 ש"ח! תסתגננו',
    body: 'הגיע הזמן לקבל את הסגנונות הכי חמים שלנו. SHEIN בטל את הרישום | הצג בדפדפ',
    to:'me@gmail.com',
    name:'SHEIN',
    from:'shein@edm.il.shein.com',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1551133930594,
    isStarred:false

  },
  {
    id: utilService.makeId(),
    subject: 'ELHANAN and 60 others made changes in your shared folders',
    body: 'Activity in Shared Folders Here\'s what happened in your shared folders last week',
    to:'me@gmail.com',
    name:'Dropbox',
    from:'no-reply@dropboxmail.com',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1551133652187,
    isStarred:false

  },
  {
    id: utilService.makeId(),
    subject: 'See more jobs like Matific - Full Stack Engineer',
    body: 'Search for more related jobs Full Stack Engineer jobs Jobs at Matific Jobs in Ramat Gan, Tel Aviv, Israel Search other jobs',
    to:'me@gmail.com',
    name:'LinkedIn ',
    from:'jobs-noreply@linkedin.com',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1552593930594,
    isStarred:false

  },
  {
    id: utilService.makeId(),
    subject: 'Hiii! how are you?',
    body: 'Hii!! I just wanted to check how are you today friend :) .',
    to:'me@gmail.com',
    name:'Dana',
    from:'dana@gmail.com',
    isRead: true,
    isSent: false,
    isDeleted: false,
    sentAt: 1553593930594,
    isStarred:false

  },
  {
    id: utilService.makeId(),
    subject: 'Wassap?',
    body: 'Pick up!',
    to:'me@gmail.com',
    name:'MOM',
    from:'muki@gmail.com',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1551133930594,
    isStarred:false

  },
  {
    id: utilService.makeId(),
    subject: 'New Sale In Renuar!!!!',
    body: 'go to our site to be first to get our sale cloths',
    to:'me@gmail.com',
    name:'RENUAR',
    from:'muki@gmail.com',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1551133652187,
    isStarred:false

  },
  {
    id: utilService.makeId(),
    subject: 'have you watched TV today?',
    body: 'check out the new show!',
    to:'me@gmail.com',
    name:'Cellcom',
    from:'muki@gmail.com',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1552593930594,
    isStarred:false

  },
  {
    id: utilService.makeId(),
    subject: 'New Terms',
    body: 'Google has new security terms. please check them out.',
    to:'me@gmail.com',
    name:'Google',
    from:'muki@gmail.com',
    isRead: true,
    isSent: false,
    isDeleted: false,
    sentAt: 1553593930594,
    isStarred:false

  },
];

export const emailService = {
  query,
  getById,
  post,
  remove,
  put,
  // getEmptyMail
};

function query() {
  return storageService.query(EMAIL_KEY).then((mails) => {
    if (!mails.length) {
      utilService.saveToStorage(EMAIL_KEY, gMails);
      mails = gMails;
    }
    return mails;
  });
}

function getById(id) {
  return storageService.get(EMAIL_KEY, id);
}

function post(compose) {
  const newMail = _createMail();
  newMail.subject = compose.subject;
  newMail.body = compose.body;
  return storageService.post(EMAIL_KEY, newMail).then((mail) => mail);
}

function remove(id) {
  return storageService.remove(EMAIL_KEY, id);
}

function put(mail){
  return storageService.put(EMAIL_KEY,mail)
}

// function getEmptyMail(){
//   return {from:'me@gmail.com', subject:'', body:''}
// }

function _createMail() {
  return {
    name:'John Doh',
    from:'me@gmail.com',
    isRead: false,
    isSent: true,
    isDeleted: false,
    sentAt: Date.now(),
  };
}
