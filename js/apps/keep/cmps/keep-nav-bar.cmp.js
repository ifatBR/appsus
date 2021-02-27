export default{
    template:`
       <div class="keep-nav-bar clean-list flex column">   
            <router-link  :class="{marked:isNotes}" to="/keep/notes">
            <div class="flex space-between">
                <h3>Notes</h3>
                <h3><span>(16)</span></h3>
            </div>
            </router-link>
            <router-link :class="{marked:!isNotes}" to="/keep/deleted">
                <h3 >Deleted</h3>
            </router-link>
            <!-- <router-link to="/keep/reminder">Reminder</router-link> -->
        </div>
    `,
    computed:{
        isNotes(){
            console.log(this.$route.path.includes('notes'))
            return this.$route.path.includes('notes');
        }
    }

}  