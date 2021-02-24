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
            <note-edit v-show="isNoteEdit" class="edit-note" :class="{'is-edit':isNoteEdit}" />
            <div class="note-edit-screen" v-show="isNoteEdit" :class="{'is-edit':isNoteEdit}"></div>
        </section>
    `,
    data() {
        return {
            isNewNote:false,
            isNoteEdit: false,
            notes: null,
        };
    },
    created() {
        this.loadNotes();
        eventBus.$on('deleteNote', this.deleteNote);
        eventBus.$on('setNoteType', this.setNoteType);
        eventBus.$on('openNoteEdit', this.openNoteEdit);
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
            const {id,noteType, url} = params;
            console.log('mommy got type:', noteType)
            // console.log('url:', url)
            keepService.setNoteType(id, noteType, url)
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
