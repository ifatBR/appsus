import keepNavBar from '../cmps/keep-nav-bar.cmp.js';
import keepNotes from './keep-notes.cmp.js';
import keepDeleted from './keep-deleted.cmp.js';
import noteEdit from '../cmps/note-edit.cmp.js';
import { keepService } from '../services/keep.service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import keepSearch from '../cmps/keep-search.cmp.js';

export default {
    template: `
        <section class="keep-app">
            <div class="keep-header flex">
                <keep-search ></keep-search>
            </div>
            <div class="flex ">
                <keep-nav-bar @click.native="loadNotes"/>
                <div class="keep-pages-container">
                    <note-edit  v-if="currNote&&!isDeletedPage" :isDeletedPage="isDeletedPage" :currNote="currNote" class="edit new-note" :isShowNoteEdit="isAddNewNote" @openAddNewNote="openAddNewNote" @closeNoteEdit="closeNoteEdit" @loadNotes="loadNotes"  @getEmptyNote="getEmptyNote" @saveNote="saveNote"/>
                    <router-view class="keep-router-view"/>
                    <note-edit v-if="currNote&&isNoteEdit" :isDeletedPage="isDeletedPage" :currNote="currNote" class="edit edit-note" :isShowNoteEdit=true :class="{'is-edit':isNoteEdit}"  @closeNoteEdit="closeNoteEdit" @deleteNoteById="deleteNoteById"  @deletePermanently="deletePermanently" @setNoteType="setNoteType" @saveNote="saveNote"/>
                </div>
            </div>
        <div class="note-edit-screen" v-show="isNoteEdit" :class="{'is-edit':isNoteEdit}" @click="closeNoteEdit"></div>
        <div class="note-new-screen" v-show="isAddNewNote" :class="{'is-add-new':isAddNewNote}" @click="closeAddNewNote"></div>
        </section>
    `,
    data() {
        return {
            isNoteEdit: false,
            notes: null,
            currNote: null,
            isAddNewNote: false,
        };
    },
    created() {
        if(this.$route.query.title || this.$route.query.txt ) this.createNoteByQuery(this.$route.query);
 
        this.loadNotes();
        keepService.getEmptyNote().then((note) => (this.currNote = note));
        eventBus.$on('deleteNote', this.deleteNote);
        eventBus.$on('restoreNote', this.restoreNote);
        eventBus.$on('openNoteEdit', this.openNoteEdit);
        eventBus.$on('addNewTask', this.addNewTask);
        eventBus.$on('deletePermanently', this.deletePermanently);
        eventBus.$on('toggleNotePin', this.toggleNotePin);
        eventBus.$on('sendNoteByEmail', this.sendNoteByEmail)

    },
    destroyed() {
        eventBus.$off('deleteNote', this.deleteNote);
        eventBus.$off('restoreNote', this.restoreNote);
        eventBus.$off('openNoteEdit', this.openNoteEdit);
        eventBus.$off('addNewTask', this.addNewTask);
        eventBus.$off('deletePermanently', this.deletePermanently);
        eventBus.$off('toggleNotePin', this.toggleNotePin);
        eventBus.$off('sendNoteByEmail', this.sendNoteByEmail)

    },
    methods: {
        openNoteEdit(note) {
            this.isNoteEdit = true;
            this.currNote = note;
        },
        closeNoteEdit() {
            if (this.isAddNewNote) this.isAddNewNote = false;
            this.currNote = null;
            this.isNoteEdit = false;
            if (this.$route.params.noteId) this.$router.go(-1);
            // if (this.$route.params.noteId) this.$router.push('/keep');
            keepService.getEmptyNote().then((note) => (this.currNote = note));
        },
        openAddNewNote() {
            this.isAddNewNote = true;
        },
        closeAddNewNote() {
            this.isAddNewNote = false;
            this.getEmptyNote({ noteType: 'noteTxt', url: null });
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

        deleteNoteById(id) {
            this.closeNoteEdit();
            keepService.markNoteDeleted(id).then(() => {
                this.loadNotes();
            });
        },
        restoreNote(id) {
            console.log('app restoring');
            this.closeNoteEdit();
            keepService.restoreNote(id).then(() => {
                this.loadNotes();
            });
        },
        deletePermanently(id) {
            this.closeNoteEdit();
            keepService.deleteNotePermanently(id).then(() => {
                this.loadNotes();
            });
        },
        saveNote(note) {
            keepService.saveNote(note).then(() => {
                this.closeNoteEdit();
                this.loadNotes();
            });
        },
        setNoteType(params) {
            const { id, noteType, bgColor } = params;
            keepService
                .setNoteType(id, noteType, bgColor)
                .then((note) => {
                    this.currNote = null;
                    return note;
                })
                .then((note) => (this.currNote = note));
        },

        getEmptyNote(params) {
            if (this.currNote.noteType === params.noteType) return;
            this.currNote = null;
            return keepService.getEmptyNote(params.noteType, params.bgColor).then((note) => (this.currNote = note));
        },
        addNewTask() {
            keepService.getNewTask().then((emptyTask) => {
                console.log('emptyTask:', emptyTask);
                eventBus.$emit('newTaskForAdding', emptyTask);
            });
        },
        toggleNotePin(id) {
            this.currNote.isPinned = !this.currNote.isPinned;     
            if(this.$route.params.noteId) return;
                  
            keepService.toggleNotePin(id).then(() => {
                this.loadNotes();
            });
        },
        sendNoteByEmail(){
            keepService.getNoteAsQuery(this.currNote.id).then(query => {
                if(!query) {
                    eventBus.$emit('show-msg', 'Can\'t send images')
                    return
                };
                this.$router.push({path: '/email/',query:query})
            })
        },
        createNoteByQuery(query){
            keepService.createNoteByQuery(query)
            .then(query => {
                this.$router.push({ path: '/keep/notes', query: {}});
                this.loadNotes()
            })
        }
    },
    computed: {
        isDeletedPage() {
            return this.$route.fullPath.includes('delete');
        },
    },

    watch: {
        $route() {
            if (this.$route.fullPath.includes('keep')) this.loadNotes();
        },
    },
    components: {
        keepNavBar,
        keepNotes,
        keepDeleted,
        noteEdit,
        keepSearch,
    },
};
