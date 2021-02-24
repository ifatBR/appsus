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
            <button @click="openNoteEdit">new note</button>
            <note-edit @loadNotes="loadNotes" v-if="true"/>
            <router-view/>
        </section>
    `,
    data() {
        return {
            isNoteEdit: false,
            notes: null,
        };
    },
    created() {
        this.loadNotes();
        eventBus.$on('deleteNote', this.deleteNote);
        eventBus.$on('setNoteType', this.setNoteType);
    },
    methods: {
        openNoteEdit() {
            this.isNoteEdit = true;
        },
        closeNoteEdit() {
            this.isNoteEdit = false;
        },
        loadNotes() {
            keepService.getNotes()
            .then((notes) => {
                this.notes = notes;
                eventBus.$emit('renderNotes', this.notes);
            });
        },
        deleteNote(id) {
            keepService.deleteNote(id)
            .then(() => this.loadNotes());
        },
        setNoteType(params) {
            const {id,noteType} = params;
            console.log('type:', noteType)
            keepService.setNoteType(id, noteType)
            .then(() => this.loadNotes());
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
