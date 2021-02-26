import { eventBus } from '../../../services/event-bus.service.js';

export default {
    props:['note'],
    template: `
    <button v-if="!isDeletedPage" class="btn-pin-note" :class="{pinned:note.isPinned}" @click.stop="pinNote" type="button">📌</button>
    `,
    methods:{
        pinNote(){
            eventBus.$emit('toggleNotePin', this.note.id)
            // this.currNote.isPinned = !this.currNote.isPinned;
            
        },
    },
    computed:{
        isDeletedPage() {
            return this.$route.fullPath.includes('delete');
        },
    }

}