// import emailInbox from './email-inbox.cmp.js'
// import emailDeleted from './email-inbox.cmp.js'

export default{
    template:`
    <div>   
        <!-- <header></header> -->
        <nav class="flex column">
        <router-link to="/email/inbox">Inbox</router-link>
        <router-link to="/email/starred">Starred</router-link>
        <router-link to="/email/sent">Sent</router-link>
        <router-link to="/email/trash">Trash</router-link>
        <router-view />
        </nav>
    </div>
    `,
    // components:{
    //     emailInbox,
    //     emailDeleted
    // }
}