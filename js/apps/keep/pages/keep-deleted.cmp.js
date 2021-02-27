import noteList from '../cmps/note-list.cmp.js'

export default{
    template:`
    <section class="">   
            <note-list :isShowDeleted="true" :isShowPinned="false"/>
    </section>
    `,
    components:{
        noteList,
    },
}