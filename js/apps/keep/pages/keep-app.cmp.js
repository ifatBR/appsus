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
            <!-- <keep-nav-bar/> -->
            <note-edit v-if="currNote" :currNote="currNote" class="edit new-note" :isShowNoteEdit="isAddNewNote" @openAddNewNote="openAddNewNote" @closeNoteEdit="closeNoteEdit" @loadNotes="loadNotes"  @getNewNote="getEmptyNote" @saveNote="saveNote"/>
            <router-view class="keep-router-view"/>
            <note-edit v-if="isNoteEdit" :currNote="currNote" class="edit edit-note" :isShowNoteEdit=true :class="{'is-edit':isNoteEdit}" @saveNote="saveNote" @closeNoteEdit="closeNoteEdit" @deleteNoteById="deleteNoteById"/>
            <div class="note-edit-screen" v-show="isNoteEdit" :class="{'is-edit':isNoteEdit}" @click="closeNoteEdit"></div>
            <div class="note-new-screen" v-show="isAddNewNote" :class="{'is-add-new':isAddNewNote}" @click="closeAddNewNote"></div>
        </section>
    `,
    data() {
        return {
            isNoteEdit: false,
            notes: null,
            currNote: null,
            isAddNewNote:false
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
            this.isAddNewNote=false;
            this.isNoteEdit = false;
            if(this.$route.params.noteId) this.$router.push('/keep');
            keepService.getEmptyNote()
            .then(note => this.currNote = note);
        },
        openAddNewNote(){
            this.isAddNewNote = true;
        },
        closeAddNewNote(){
            this.isAddNewNote=false;
            this.getEmptyNote({noteType:'noteTxt', url:null});
        },
        loadNotes() {
            if(this.isNoteEdit)this.closeNoteEdit()
            keepService
                .getNotes()
                .then((notes) => {
                    this.notes = notes;
                })
                .then(() => {
                    eventBus.$emit('renderNotes', this.notes);
                });
        },
        deleteNoteById(id) {
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
                    this.getEmptyNote({noteType:'noteTxt', url:null})
                    .then(note => this.currNote = note);
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
            keepService.getNewTask()
            .then(task => {
                this.currNote.info.todos.push(task)
            })
        },
    },
    components: {
        keepNavBar,
        keepNotes,
        keepDeleted,
        keepReminder,
        noteEdit,
    },
};
