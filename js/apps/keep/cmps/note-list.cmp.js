import notePreview from './note-preview.cmp.js';
import { keepService } from '../services/keep.service.js';

export default {
    template: `
    <section> 
        <h1>list</h1>  
        <ul class="notes-list main-container clean-list grid justify-center">
            <li v-if="notes" v-for="(note) in notes">
                <note-preview v-if="notes" :note="note"/>
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
        keepService.getNotes().then((notes) => (this.notes = notes));
    },
    components: {
        notePreview,
    },
};
