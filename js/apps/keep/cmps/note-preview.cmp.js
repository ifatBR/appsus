import noteFooter from './note-footer.cmp.js';
// import { eventBus } from '../../../services/event-bus.service.js';
import noteTxt from './dynamicNotes/note-txt.cmp.js'
import noteTodo from './dynamicNotes/note-todo.cmp.js'
import noteImg from './dynamicNotes/note-img.cmp.js'

export default {
    props: ['note'],
    template: `
    <section class="note-preview flex column space-between" v-bind:style="style">  
        <div>
            <h2>{{note.title}}</h2>
            <component :is="note.type" :info="note.info"></component>    
        </div>
        <!-- <note-footer @noteIdToDelete="noteIdToDelete" @setNoteType="setNoteType"/> -->
    </section>
    `,
    data() {
        return {
            color: null,
        };
    },
    created() {
        this.color = this.note.style.bgColor;
    },
    methods: {
        noteIdToDelete() {
            eventBus.$emit('deleteNote', this.note.id);
        },
        // setNoteType(type) {
        //     console.log(type);
        //     eventBus.$emit('setNoteType', { id: this.note.id, noteType: type });
        // },
    },
    computed: {
        style(){
            return {'background-color':this.note.style.bgColor}
        }
    },
    components: {
        noteFooter,
        noteTxt,
        noteTodo,
        noteImg
    },
};
