import mainHeader from '../../../cmps/main-header.cmp.js'
import keepNotes from './keep-notes.cmp.js'
import keepDeleted from './keep-deleted.cmp.js'
import keepReminder from './keep-reminder.cmp.js'

export default{
    template:`
    <h1>notes</h1>
    <router-view />
    `,
    components:{
        mainHeader,
        keepNotes,
        keepDeleted,
        keepReminder
    }
}