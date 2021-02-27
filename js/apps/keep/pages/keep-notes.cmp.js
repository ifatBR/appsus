import noteList from '../cmps/note-list.cmp.js'

export default{
    template:`
    <section class="">   
            <note-list class="pinned-list" :isShowDeleted="false" :isShowPinned="true"/>
            <note-list :isShowDeleted="false" :isShowPinned="false"/>
    </section>
    `,
    components:{
        noteList,
    },
}