import keepNavBar from '../cmps/keep-nav-bar.cmp.js';
import keepNotes from './keep-notes.cmp.js';
import keepDeleted from './keep-deleted.cmp.js';
import keepReminder from './keep-reminder.cmp.js';
import noteEdit from '../cmps/note-edit.cmp.js';

export default {
    template: `
        <section>
            <keep-nav-bar/>
            <button @click="openNoteEdit">new note</button>
            <note-edit v-if="true"/>
            <h1>keep app</h1>
            <router-view/>
        </section>
    `,
    data(){
        return{
        isNoteEdit:false,
    }
    },
    methods:{
        openNoteEdit(){
            this.isNoteEdit=true;
        },
        closeNoteEdit(){
            this.isNoteEdit=false;
        }
    },
    components: {
        keepNavBar,
        keepNotes,
        keepDeleted,
        keepReminder,
        noteEdit
    },
};
