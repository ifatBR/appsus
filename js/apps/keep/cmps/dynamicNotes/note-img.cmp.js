export default{
    props:['info'],
    template:`
    <div class="flex">   
        <img :src="info.url" class="note-img" @click="changeImg"/>
    </div>
    `,
    methods:{
        changeImg(){
            //TODO pick different img
            console.log('changing img');
            if(!this.$route.params.noteId)return;
        }
    }
}