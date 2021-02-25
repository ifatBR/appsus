import keepNavBar from '../cmps/keep-nav-bar.cmp.js';
import keepNotes from './keep-notes.cmp.js';
import keepDeleted from './keep-deleted.cmp.js';
import keepReminder from './keep-reminder.cmp.js';
import noteEdit from '../cmps/note-edit.cmp.js';
import { keepService } from '../services/keep.service.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
    template: `
        <section>
            <keep-nav-bar/>
            <note-edit class="new-note" @loadNotes="loadNotes"/>
            <router-view/>
            <note-edit v-if="isNoteEdit" :currNote="currNote" class="edit-note" :class="{'is-edit':isNoteEdit}" @saveNote="saveNote" @closeNoteEdit="closeNoteEdit"/>
            <div class="note-edit-screen" v-show="isNoteEdit" :class="{'is-edit':isNoteEdit}" @click="closeNoteEdit"></div>
        </section>
    `,
    data() {
        return {
            // isNewNote:false,
            isNoteEdit: false,
            notes: null,
            currNote:null
        };
    },
    created() {
        this.loadNotes();
        eventBus.$on('deleteNote', this.deleteNote);
        eventBus.$on('setNoteType', this.setNoteType);
        eventBus.$on('openNoteEdit', this.openNoteEdit);
    },
    destroyed(){
        eventBus.$off('deleteNote', this.deleteNote);
        eventBus.$off('setNoteType', this.setNoteType);
        eventBus.$off('openNoteEdit', this.openNoteEdit);
    },
    methods: {
        openNoteEdit() {
            this.isNoteEdit = true;
        },
        closeNoteEdit() {
            this.isNoteEdit = false;
            this.$router.push('/keep')
        },
        loadNotes() {
            keepService.getNotes()
            .then((notes) => {
                this.notes = notes;
            })
            .then(()=>{
            eventBus.$emit('renderNotes', this.notes)
        });
        },
        deleteNote(id) {
            keepService.deleteNote(id)
            .then(() => this.loadNotes());
        },
        setNoteType(params) {
            const {id,noteType, url} = params;
            console.log('mommy got type:', noteType)
            keepService.setNoteType(id, noteType, url)
            .then(() => this.loadNotes());
        },
        saveNote(){
            if(this.currNote){
                console.log('saved:',this.currNote);
                keepService.updateNote(this.currNote).then(() =>{ 
                    this.loadNotes()
                    this.closeNoteEdit()
                    })  
                return;
            }
                
            const {title, txt, bgColor} = details;
            keepService.saveNote(this.type,{title,txt, bgColor})
            .then(() => this.loadNotes())  
        },
    },
    watch:{
        '$route.params.noteId'(id){
            if(!id) return;
            keepService.getNoteById(id)
            .then(note => this.currNote = note)
            // .then(()=> this.openNoteEdit());
        }
    },
    components: {
        keepNavBar,
        keepNotes,
        keepDeleted,
        keepReminder,
        noteEdit,
    },
};
