export default{
    template:`
    <nav class="main-nav-bar flex align-center">   
        <img class="app-icon" :src="icon">
        <router-link to="/">Home</router-link>
        <router-link to="/email">Email</router-link>
        <router-link to="/keep/notes">Keep</router-link>
        <router-link to="/about">About</router-link>
        <button class="burger-nav-bar" hidden></button>
    </nav>
    `,
    computed:{
        icon(){
            let filePath = '../../../imgs/';
            const routerPath = this.$route.path;
            if(routerPath.includes('email')) return filePath+'email.png'
            if(routerPath.includes('note')) return filePath+'note.png'
            if(routerPath.includes('book')) return filePath+'book.png'
        }
    }
}