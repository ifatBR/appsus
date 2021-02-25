import noteList from '../cmps/note-list.cmp.js'

export default{
    template:`
    <section class="main-container">   
            <note-list/>
    </section>
    `,
    components:{
        noteList,
    },
    methods:{
        noteIdToDelete(id){
        console.log(id);}
    }
}