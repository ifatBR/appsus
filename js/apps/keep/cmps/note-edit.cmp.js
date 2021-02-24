import { keepService } from '../services/keep.service.js';
import noteFooter from './note-footer.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js';

export default {
    template: `
    <section class="note-edit">
        <form @submit.prevent="saveNote(true)" class="flex column">
            <button @click="pinNote">📌</button>
            <input type="text" v-model="title" placeholder="title"/>
            <textarea class="free-txt" rows="2" cols="50" v-model="txt" placeholder="Write something..."></textarea>
            <note-footer  @saveNote="saveNote" @changeBgColor="changeBgColor" @setNoteType="setNoteType"/>
        </form>
    </section>
    `,
    data(){
        return{
            title:'',
            txt:'',
            noteType:'noteTxt',
            bgColor:'',
            noteId :null
        }
    },
    created(){
        this.noteId = this.$route.params.noteId
        if(!this.noteId) return;
        this.showNoteDetails()
    },
    methods:{
        pinNote(){
            console.log('pinned note');
        },
        changeBgColor(color){
            this.bgColor=color;
        },
        saveNote(isSaveNote){
            if(isSaveNote) this.saveNoteDetails();
            this.title='';
            this.txt='';
        },
        saveNoteDetails(){
            const {title, txt, bgColor} = this;
            keepService.saveNote(this.type,{title,txt, bgColor})
            .then(() =>this.$emit('loadNotes'))  
        },
        
        setNoteType(params) {
            this.noteType= params.noteType;
            if(!this.noteId) return;
            params['id'] = this.noteId;
            eventBus.$emit('setNoteType', params);
        },
        showNoteDetails(){
            //TODO
        }
    },

    components:{
        noteFooter,
    }
}