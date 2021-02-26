import noteList from '../cmps/note-list.cmp.js'

export default{
    template:`
    <section class="main-container">   
            <note-list :isShowDeleted="false" :isShowPinned="true"/>
            <note-list :isShowDeleted="false" :isShowPinned="false"/>
    </section>
    `,
    components:{
        noteList,
    },
}