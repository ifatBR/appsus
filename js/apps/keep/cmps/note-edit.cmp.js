import { keepService } from '../services/keep.service.js';
import noteFooter from './note-footer.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js';
import editNoteImg from './dynamicNotes/edit-note-img.cmp.js'
import editNoteTodo from './dynamicNotes/edit-note-todo.cmp.js'
import editNoteTxt from './dynamicNotes/edit-note-txt.cmp.js'

export default {
    props:['currNote'],
    template: `
    <section class="note-edit">
        <form @submit.prevent="saveNote(true)" class="flex column">
            <button @click="pinNote">📌</button>
            <input type="text" v-model="title" placeholder="title"/>
            <!-- <textarea class="free-txt" rows="2" cols="50" v-model="txt" placeholder="Write something..."></textarea> -->
            <component :is="componentType" :info="info"></component>    
            <note-footer  @saveNote="saveNote" @changeBgColor="changeBgColor" @setNoteType="setNoteType" @closeNoteEdit="closeNoteEdit"/>
        </form>
    </section>
    `,
    data(){
        return{
            title:'',
            txt:'',
            noteType:'noteTxt',
            bgColor:'',
            title:'',
            info:'',
            type:'',
            bgColor:'',
            componentType:'edit-note-txt'
        }
    },
    created(){
        if(!this.currNote) return;
        this.showNoteDetails()
        // console.log('currNote:',this.currNote);
    },
    methods:{
        pinNote(){
            console.log('pinned note');
        },
        changeBgColor(color){
            this.bgColor=color;
        },
        saveNote(isSaveNote){
            const {title, txt, bgColor} = this;
            this.currNote.title = title;
            this.currNote.txt = txt;
            this.currNote.bgColor = bgColor;

            if(isSaveNote) this.$emit('saveNote');
            this.title='';
            this.txt='';
        },
        closeNoteEdit(){
            this.$emit('closeNoteEdit');
        },
        
        setNoteType(params) {
            this.noteType= params.noteType;
            if(!this.noteId) return;
            params['id'] = this.noteId;
            eventBus.$emit('setNoteType', params);
        },
        showNoteDetails(){
            const {title,info,type,style:{bgColor}} = this.currNote; 
            this.title = title;
            this.info=info;
            this.type=type;
            this.bgColor = bgColor;
            this.componentType = 'edit-'+this.currNote.type;
            // if(!this.$route.params.noteId) return;
            // console.log('details');
            //!!!!!!!!!!!!!!!!!!!!!!!
            //TODO
        }
    },
    watch:{
        '$route.params.noteId'(){
            // if(!this.currNote) return;
            // this.showNoteDetails()
        }
    },
    components:{
        noteFooter,
        editNoteImg,
        editNoteTodo,
        editNoteTxt
    }
}