import { keepService } from '../services/keep.service.js';
import noteFooter from './note-footer.cmp.js'

export default {
    template: `
    <section class="note-edit flex column">
        <button @click="pinNote">📌</button>
        <input type="text" v-model="title" placeholder="title"/>
        <textarea class="free-txt" rows="2" cols="50" v-model="txt" placeholder="Write something..."></textarea>
        <note-footer @saveNote="saveNote" @changeBgColor="changeBgColor"/>
    </section>
    `,
    data(){
        return{
            title:'',
            txt:'',
            bgColor:''
        }
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
            keepService.saveNote('noteTxt',{title,txt, bgColor})
            .then(() =>this.$emit('loadNotes'))
            
        },
    },
    components:{
        noteFooter,
    }
}