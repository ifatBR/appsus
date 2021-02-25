import notePreview from './note-preview.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
    template: `
    <section> 
        <ul v-if="notes" class="notes-list clean-list">
            <li v-if="notes" v-for="(note) in notes" :key="note.id" style="display:block;">
                <note-preview :note="note" />
            </li>
        </ul>   
    </section>
    `,
    data() {
        return {
            notes: null,
        };
    },
    created() {
        eventBus.$on('renderNotes', this.renderNotes);
    },
    methods: {
        renderNotes(notes) {
            this.notes = notes;
        },
    },
    components: {
        notePreview,
    },
};
