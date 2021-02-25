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
        <form @submit.prevent="saveNote" class="flex column">
            <button class="btn-pin-note" @click="pinNote" type="button">📌</button>
            <input type="text" class="title" v-model="title" placeholder="title"/>
            <component :is="componentType" :info="info"></component>    
            <note-footer  @saveNote="saveNote" @changeBgColor="changeBgColor" @setNoteType="setNoteType" @closeNoteEdit="closeNoteEdit" @noteIdToDelete="noteIdToDelete"/>
        </form>
    </section>
    `,
    data(){
        return{
            txt:'',
            noteType:'',
            bgColor: '',
            title:'',
            info:{},
            componentType:'edit-note-txt'
        }
    },
    created(){
        this.showNoteDetails()
    },
    methods:{
        pinNote(){
            this.currNote.isPinned = !this.currNote.isPinned;
            console.log(this.currNote.isPinned);
        },
        changeBgColor(color){
            this.bgColor=color;
        },
        saveNote(){
            const {title, txt, bgColor} = this;
            this.currNote.title = title;
            this.currNote.txt = txt;
            this.currNote.style.bgColor = bgColor;
            this.$emit('saveNote',this.currNote);
            this.title='';
        },
        closeNoteEdit(){
            this.$emit('closeNoteEdit');
        },
        
        setNoteType(params) {
            this.noteType= params.noteType;
            this.componentType = 'edit-'+ this.noteType;
            if(!this.$route.params.noteId) {
                this.getNewNote(params)
                return;
            }
            params['id'] = this.noteId;
            eventBus.$emit('setNoteType', params);
        },
        getNewNote(params){
            this.$emit('getNewNote',params);
        },
        showNoteDetails(){
            console.log('showing details');
            const {title,info,type,bgColor} = this.currNote; 
            console.log('this.currNote',this.currNote);
            this.title = title;
            this.info=info;
            this.noteType=type;
            this.bgColor = bgColor;
            this.componentType = 'edit-'+this.currNote.type;
        },
        noteIdToDelete(){
            this.$emit('deleteNoteById',this.currNote.id)
        }
    },
    components:{
        noteFooter,
        editNoteImg,
        editNoteTodo,
        editNoteTxt
    }
}