import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

const EMAIL_KEY = 'mails';
const gMails = [
  {
    id: utilService.makeId(),
    subject: 'Wassap?',
    body: 'Pick up!',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1551133930594,
  },
  {
    id: utilService.makeId(),
    subject: 'New Sale In Renuar!!!!',
    body: 'go to our site to be first to get our sale cloths',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1551133652187,
  },
  {
    id: utilService.makeId(),
    subject: 'have you watched TV today?',
    body: 'check out the new show!',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1552593930594,
  },
  {
    id: utilService.makeId(),
    subject: 'New Terms',
    body: 'Google has new security terms. please check them out.',
    isRead: true,
    isSent: false,
    isDeleted: false,
    sentAt: 1553593930594,
  },
  {
    id: utilService.makeId(),
    subject: 'Wassap?',
    body: 'Pick up!',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1551133930594,
  },
  {
    id: utilService.makeId(),
    subject: 'New Sale In Renuar!!!!',
    body: 'go to our site to be first to get our sale cloths',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1551133652187,
  },
  {
    id: utilService.makeId(),
    subject: 'have you watched TV today?',
    body: 'check out the new show!',
    isRead: false,
    isSent: false,
    isDeleted: false,
    sentAt: 1552593930594,
  },
  {
    id: utilService.makeId(),
    subject: 'New Terms',
    body: 'Google has new security terms. please check them out.',
    isRead: true,
    isSent: false,
    isDeleted: false,
    sentAt: 1553593930594,
  },
];

export const emailService = {
  query,
  getById,
  post,
  remove,
  put
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

function _createMail() {
  return {
    isRead: false,
    isSent: true,
    isDeleted: false,
    sentAt: Date.now(),
  };
}
