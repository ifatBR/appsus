import navBar from './nav-bar.cmp.js'

export default{
    template:`
    <header class="main-header flex align-center space-between"  :class="{shadow:!isHomePage}">  
        <router-link  class="logo flex align-center" to="/">
            <h1>Appsus</h1>
        </router-link>
        
        <nav-bar/>
    </header>
    `,
    data(){
        return{
            isHomePage:true
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