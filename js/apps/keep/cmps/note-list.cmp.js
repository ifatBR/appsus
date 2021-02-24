import notePreview from './note-preview.cmp.js';

export default {
    props:['notes'],
    template: `
    <section> 
        <h1>list</h1>  
        <ul  v-if="notes" class="notes-list main-container clean-list grid justify-center">
            <li v-if="notes" v-for="(note) in notes">
                <note-preview :note="note"/>
            </li>
        </ul>   
    </section>
    `,
    data() {
        return {
        };
    },
    components: {
        notePreview,
    },
};
