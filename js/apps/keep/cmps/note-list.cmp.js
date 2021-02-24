import notePreview from './note-preview.cmp.js';
import { keepService } from '../services/keep.service.js';

export default {
    template: `
    <section> 
        <h1>preview</h1>  
        <ul class="notes-list clean-list">
            <note-preview v-if="notes" :notes="notes"/>
        </ul>   
    </section>
    `,
    data() {
        return {
            notes: null,
        };
    },
    created() {
        keepService.getNotes().then((notes) => (this.notes = notes));
    },
    components: {
        notePreview,
    },
};
