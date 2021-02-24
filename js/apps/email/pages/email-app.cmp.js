import emailInbox from './email-inbox.cmp.js'
// import emailDeleted from './email-inbox.cmp.js'

export default{
    template:`
    <section class="email-app">   
        <header> this is the header</header>


        <div class="main-email-app">
        <nav class="aside-nav-bar flex column">
        <router-link to="/email/inbox">Inbox</router-link>
        <router-link to="/email/starred">Starred</router-link>
        <router-link to="/email/sent">Sent</router-link>
        <router-link to="/email/trash">Trash</router-link>
        </nav>


        <router-view />
        </div>
    </section>
    `,
    components:{
        emailInbox,
    //     emailDeleted
    }
}