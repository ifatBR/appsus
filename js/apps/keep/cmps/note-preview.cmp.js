import noteFooter from './note-footer.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';
import noteTxt from './dynamicNotes/note-txt.cmp.js';
import noteTodo from './dynamicNotes/note-todo.cmp.js';
import noteImg from './dynamicNotes/note-img.cmp.js';
import notePin from './note-pin.cmp.js';

export default {
    props: ['note'],
    template: `
    <section class="note-preview" v-bind:style="style" @click="openNoteEdit">  
            <note-pin :note="this.note"/>
            <h2 class="title">{{note.title}}</h2>
            <component :is="note.type" :info="this.note.info"></component>   
            <router-link class="preview-link absolute-full" :to="this.noteId"></router-link> 

    </section>
    `,
    created() {
        this.color = this.note.style.bgColor;
    },
    methods: {
        openNoteEdit() {
            eventBus.$emit('openNoteEdit', this.note);
        },
    },
    computed: {
        style() {
            return { 'background-color': this.note.style.bgColor };
        },
        noteId() {
            if (this.$route.path.includes('notes')) return 'notes/' + this.note.id;
            if (this.$route.path.includes('deleted')) return 'deleted/' + this.note.id;
        },
      
    },
    components: {
        noteFooter,
        noteTxt,
        noteTodo,
        noteImg,
        notePin
    },
};
