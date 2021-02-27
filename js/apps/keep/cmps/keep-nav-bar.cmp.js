export default {
    template: `
       <div class="keep-nav-bar clean-list flex column">   
            <button @click="toggleNavBar" class="burger-keep-nav-bar"></button>
            <div class="keep-nav-bar-lnk flex column" :class="show">
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
            <!-- <router-link to="/keep/reminder">Reminder</router-link> -->
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
            console.log(this.$route.path.includes('notes'));
            return this.$route.path.includes('notes');
        },
        show(){
            return{show:(this.isShow)}
        },
    },
};
