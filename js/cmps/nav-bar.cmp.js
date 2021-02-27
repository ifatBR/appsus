export default{
    template:`
    <nav class="main-nav-bar flex align-center">
        <img class="app-icon" :src="icon">
        <div class="main-nav-bar-lnk" :class="show">   
            <router-link to="/" @click.native="closeNavBar">Home</router-link>
            <router-link to="/email" @click.native="closeNavBar">Email</router-link>
            <router-link to="/keep/notes" @click.native="closeNavBar">Keep</router-link>
            <router-link to="/about" @click.native="closeNavBar">About</router-link>
        </div>
        <button @click="openNavBar" class="burger-nav-bar"></button>
        <div class="nav-bar-screen" v-show="isShow" @click="closeNavBar"></div>

    </nav>
    `,
    data(){
        return{
            isShow:false,
        }
    },
    methods:{
        openNavBar(){
            this.isShow =true;
        },
        closeNavBar(){
            this.isShow =false;
        }
    },
    computed:{
        icon(){
            let filePath = 'imgs/';
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