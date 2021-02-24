import noteList from '../cmps/note-list.cmp.js'

export default{
    props:['notes'],
    template:`
    <section>   
        <h1>notes</h1>
            <note-list :notes="notes"/>
    </section>
    `,
    components:{
        noteList,
    }
}