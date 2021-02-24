import keepNavBar from '../cmps/keep-nav-bar.cmp.js';
import keepNotes from './keep-notes.cmp.js';
import keepDeleted from './keep-deleted.cmp.js';
import keepReminder from './keep-reminder.cmp.js';
import noteEdit from '../cmps/note-edit.cmp.js';
import { keepService } from '../services/keep.service.js';


export default {
    template: `
        <section>
            <keep-nav-bar/>
            <button @click="openNoteEdit">new note</button>
            <note-edit @loadNotes="loadNotes" v-if="true"/>
            <h1>keep app</h1>
            <router-view :notes="notes"/>
        </section>
    `,
    data(){
        return{
        isNoteEdit:false,
        notes:null
    }
    },
    created(){
        this.loadNotes();
    },
    methods:{
        openNoteEdit(){
            this.isNoteEdit=true;
        },
        closeNoteEdit(){
            this.isNoteEdit=false;
        },
        loadNotes(){
            keepService.getNotes().then((notes) => {
                (this.notes = notes)
            })
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
