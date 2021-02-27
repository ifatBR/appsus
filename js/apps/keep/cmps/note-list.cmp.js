import notePreview from './note-preview.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
    props:['isShowPinned', 'isShowDeleted'],
    template: `
    <section> 
        <ul v-if="notes" class="notes-list">
            <li v-if="notes" v-for="(note) in notesToShow" :key="note.id" style="display:block;">
                    <note-preview :note="note" />
                </li>
        </ul>  
    </section>
    `,
    data() {
        return {
            notes: null,
            filterBy:null,
        };
    },
    created() {
        eventBus.$on('renderNotes', this.renderNotes);
        eventBus.$on('setFilter', this.setFilter);
    },
    methods: {
        renderNotes(notes) {
            const pinnedNotes = notes.filter(note => {
                return note.isDeleted === this.isShowDeleted
                && note.isPinned === this.isShowPinned
            })
            this.notes = pinnedNotes;
        },
        setFilter(filterBy){
            this.filterBy = filterBy;
            console.log(this.filterBy.txt);
        },
    },
    computed:{
        notesToShow(){
            if(!this.filterBy) return this.notes;
            const search = this.filterBy.txt.toLowerCase();
            return this.notes.filter(note => {
                let isInfoIncludeSearch = false;
                switch (note.type){
                    case 'noteTxt':
                        isInfoIncludeSearch = note.info.txt.toLowerCase().includes(search);
                        break;
                    case 'noteTodo':
                        isInfoIncludeSearch =  0 <= note.info.todos.findIndex(({txt}) => txt.toLowerCase().includes(search));
                        break;
                    case 'noteImg':
                        isInfoIncludeSearch =  note.info.url.toLowerCase().includes(search);
                        break;
                }
                console.log('isDeleted',note.isDeleted);
               return note.title.toLowerCase().includes(search) || isInfoIncludeSearch;
               
        })

        }
    },
    components: {
        notePreview,
    },
};
