import noteList from '../cmps/note-list.cmp.js'
// import keepPreview from './note-preview.cmp.js'

export default{
    template:`
    <section>   
        <h1>notes</h1>
            <note-list/>
    </section>
    `,
    created(){
    },
    components:{
        // keepPreview,
        noteList,
    }
}