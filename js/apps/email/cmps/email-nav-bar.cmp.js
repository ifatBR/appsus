
export default{
    template:`
    <nav class="aside-nav-bar flex column">

       <button @click="$emit('editMail')">COMPOSE</button>

        <router-link to="/email/inbox">Inbox</router-link>
        <router-link to="/email/starred">Starred</router-link>
        <router-link to="/email/sent">Sent</router-link>
        <router-link to="/email/trash">Trash</router-link>
    </nav>
    `,
}