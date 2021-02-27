export default {
    template: `
       <div class="keep-nav-bar clean-list flex column">   
           <div class="keep-nav-bar-screen" v-show="isShow" @click="closeNavBar"></div>
            <button @click="toggleNavBar" class="burger-keep-nav-bar"></button>
            <div class="keep-nav-bar-lnk flex column" :class="show">
                <button @click="toggleNavBar" class="burger-keep-nav-bar"></button>
                <router-link  :class="{marked:isNotes}" to="/keep/notes" @click.native="closeNavBar">
                <div class="flex space-between">
                    <h3>Notes</h3>
                    <h3><span>(16)</span></h3>
                </div>
                </router-link>
                <router-link :class="{marked:!isNotes}" to="/keep/deleted" @click.native="closeNavBar">
                    <h3 >Deleted</h3>
                </router-link>
            </div>  
        </div>
    `,
      data(){
        return{
            isShow:false,
        }
    },
     methods:{
        toggleNavBar(){
            this.isShow =!this.isShow
        },
        closeNavBar(){
            this.isShow =false;
        }
    },
    computed: {
        isNotes() {
            return this.$route.path.includes('notes');
        },
        show(){
            return{show:(this.isShow)}
        },
    },
};
