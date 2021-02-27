export default{
    template:`
    <nav class="main-nav-bar flex align-center">
        <img class="app-icon" :src="icon">
        <div class="main-nav-bar-lnk" :class="show">   
            <router-link to="/" @click.native="toggleNavBar">Home</router-link>
            <router-link to="/email" @click.native="toggleNavBar">Email</router-link>
            <router-link to="/keep/notes" @click.native="toggleNavBar">Keep</router-link>
            <router-link to="/about" @click.native="toggleNavBar">About</router-link>
        </div>
        <button @click="toggleNavBar" class="burger-nav-bar"></button>
        <div class="nav-bar-screen" v-show="isShow" @click="toggleNavBar"></div>

    </nav>
    `,
    data(){
        return{
            isShow:false,
        }
    },
    methods:{
        toggleNavBar(){
            this.isShow =!this.isShow;
        }
    },
    computed:{
        icon(){
            let filePath = '../../../imgs/';
            const routerPath = this.$route.path;
            if(routerPath.includes('email')) return filePath+'email.png'
            if(routerPath.includes('note')) return filePath+'note.png'
            if(routerPath.includes('book')) return filePath+'book.png'
        },
        show(){
            return{show:(this.isShow)}
        }
    }
}