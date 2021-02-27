import navBar from './nav-bar.cmp.js'
export default {
    template: `
    <header class="main-header flex align-center space-between" :class="headerClass">
        <router-link v-if="!isHomePage" class="logo" to="/" exact>Sofi's books</router-link>
        <nav-bar/>
    </header>
    `,
    data(){
        return{
            isHomePage:null
        }
    },
    components:{
        navBar,
    },
    computed:{
        headerClass(){
            return {'home-page-header':this.isHomePage};
        }
    },
   watch:{
       $route (to,from){
        this.isHomePage = this.$route.fullPath ==='/';
       }
    },
    created(){
        this.isHomePage = this.$route.fullPath ==='/';
    }
};
