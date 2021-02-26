import navBar from './nav-bar.cmp.js'

export default{
    template:`
    <header class="main-header flex align-center space-between">  
        <router-link  class="logo flex align-center" to="/">
            <h1>Appsus</h1>
        </router-link>
        <!-- <router-link  class="logo" to="/"><img src="../../imgs/logo.png" class="logo"></router-link> -->
        <nav-bar />
    </header>
    `,
    data(){
        return{
            isHomePage:false
        }
    },
    watch:{
        $route (){
            this.isHomePage = this.$route.fullPath ==='/';
           }
    },
    components:{
        navBar,
    }
}