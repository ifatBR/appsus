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
            <note-edit v-if="currNote" :currNote="currNote" class="new-note" @loadNotes="loadNotes" @click.native="getEmptyNote"/>
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
        openNoteEdit() {
            this.isNoteEdit = true;
        },
        closeNoteEdit() {
            this.isNoteEdit = false;
            this.$router.push('/keep');
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
            // if(this.$route.params.noteId) console.log('existing one');
            console.log('mommy got type:', noteType);
            keepService.setNoteType(id, noteType, url).then(() => this.loadNotes());
        },
        saveNote() {
            if (this.currNote) {
                console.log('saved:');
                console.log('saved:',this.currNote);
                keepService.updateNote(this.currNote).then(() => {
                    this.loadNotes();
                    this.closeNoteEdit();
                });
                return;
            }

            const { title, txt, bgColor } = details;
            keepService.saveNote(this.type, { title, txt, bgColor }).then(() => this.loadNotes());
        },
        getEmptyNote() {
            if (this.currNote) return;
            this.currNote = keepService.getEmptyNote();
            console.log('free', this.currNote);
        },
        addNewTask(){
            const currInfo = this.currNote.info
            if (!currInfo.todos) this.currNote.info['todos'] = [];

            keepService.getNewTask()
            .then(task => this.currNote.info.todos.push(task))
            .then(task => console.log(this.currNote.info.todos))
            // .then(() => this.loadNotes())
        }
    },
    watch: {
        '$route.params.noteId'(id) {
            if (!id) return;
            keepService.getNoteById(id).then((note) => (this.currNote = note));
            // .then(()=> this.openNoteEdit());
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
