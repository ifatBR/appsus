// import { storageService } from '../../../services/async-storage.service.js';
// import { utilService } from '../../../services/util.service.js';


export const searchService = {
    searchByName
};

function searchByName(searchBy,mails) {
    const searchedStr = searchBy.toLowerCase()
    console.log(searchedStr);
    const mailsToShow = mails.filter(({subject,body})=> subject.toLowerCase().includes(searchedStr)||body.toLowerCase().includes(searchedStr))
    return mailsToShow
}