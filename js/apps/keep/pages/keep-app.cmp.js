import keepNavBar from '../cmps/keep-nav-bar.cmp.js';
import keepNotes from './keep-notes.cmp.js';
import keepDeleted from './keep-deleted.cmp.js';
import keepReminder from './keep-reminder.cmp.js';
import noteEdit from '../cmps/note-edit.cmp.js';
import { keepService } from '../services/keep.service.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
    template: `
        <section class="keep-app">
            <keep-nav-bar/>
            <note-edit v-if="currNote" :currNote="currNote" class="new-note" @loadNotes="loadNotes"  @getNewNote="getEmptyNote" @saveNote="saveNote"/>
            <router-view/>
            <note-edit v-if="isNoteEdit" :currNote="currNote" class="edit-note" :class="{'is-edit':isNoteEdit}" @saveNote="saveNote" @closeNoteEdit="closeNoteEdit"/>
            <div class="note-edit-screen" v-show="isNoteEdit" :class="{'is-edit':isNoteEdit}" @click="closeNoteEdit"></div>
        </section>
    `,
    data() {
        return {
            isNoteEdit: false,
            notes: null,
            currNote: null,
        };
    },
    created() {
        this.loadNotes();
        keepService.getEmptyNote().then((note) => (this.currNote = note));
        eventBus.$on('deleteNote', this.deleteNote);
        eventBus.$on('setNoteType', this.setNoteType);
        eventBus.$on('openNoteEdit', this.openNoteEdit);
        eventBus.$on('addNewTask', this.addNewTask)  
    },
    destroyed() {
        eventBus.$off('deleteNote', this.deleteNote);
        eventBus.$off('setNoteType', this.setNoteType);
        eventBus.$off('openNoteEdit', this.openNoteEdit);
        eventBus.$off('addNewTask', this.addNewTask);
    },
    methods: {
        openNoteEdit(note) {
            this.isNoteEdit = true;
            this.currNote = note;
        },
        closeNoteEdit() {
            this.isNoteEdit = false;
            if(this.$route.params.noteId) this.$router.push('/keep');
            this.currNote = keepService.getEmptyNote();
        },
        loadNotes() {
            keepService
                .getNotes()
                .then((notes) => {
                    this.notes = notes;
                })
                .then(() => {
                    eventBus.$emit('renderNotes', this.notes);
                });
        },
        deleteNote(id) {
            keepService.deleteNote(id).then(() => this.loadNotes());
        },
        setNoteType(params) {
            const { id, noteType, url } = params;
            keepService.setNoteType(id, noteType, url).then(note => loadNotes());
        },
        saveNote(note) {
                keepService.saveNote(note)
                .then(() => {
                    this.loadNotes();
                    this.closeNoteEdit()
                    this.currNote = this.getEmptyNote({noteType:null, url:null});
                });
        },
        getEmptyNote(params) {
            const {noteType, url} = params
            // console.log('params:', params)
            if (this.currNote.noteType === noteType) return;
            this.currNote=null;
            return keepService.getEmptyNote(noteType, url)
            .then(note => this.currNote = note)
        },
        addNewTask(){
            const currInfo = this.currNote.info
            // console.log('currInfo:', currInfo)
            keepService.getNewTask()
            .then(task => {
                // console.log('task',task);
                console.log(this.currNote)
                this.currNote.info.todos.push(task)
            })
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
