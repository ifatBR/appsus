import { keepService } from '../services/keep.service.js';
import noteFooter from './note-footer.cmp.js'
import editNoteImg from './dynamicNotes/edit-note-img.cmp.js'
import editNoteTodo from './dynamicNotes/edit-note-todo.cmp.js'
import editNoteTxt from './dynamicNotes/edit-note-txt.cmp.js'
import noteDelete from './note-delete.cmp.js'

export default {
    props:['currNote','isShowNoteEdit'],
    template: `
    <section class="note-edit" v-bind:style="style" @click="openAddNewNote">
        <form @submit.prevent="saveNote" class="flex column" >
                <button v-if="isShowNoteEdit" class="btn-pin-note" @click="pinNote" type="button">📌</button>
                <input v-if="isShowNoteEdit" type="text" class="title" v-model="title" placeholder="title"/>
                <component :isShowNoteEdit="isShowNoteEdit" class="note-edit-component" :is="componentType" :info="info" ></component>    
                <note-footer v-if="isShowNoteEdit" @saveNote="saveNote" @changeBgColor="changeBgColor" @setNoteType="setNoteType" @closeNoteEdit="closeNoteEdit" @deleteNote="approveDeleteNote"/>
        </form>
        <note-delete v-if="isShowDeleteApproval" @deleteNote="deleteNote"/>
    </section>
    `,
    data(){
        return{
            tempNote:{},
            noteType:'',
            bgColor: '#fcfcfc',
            title:'',
            info:{},
            componentType:'edit-note-txt',
            isShowDeleteApproval:false,
        }
    },
    created(){
        if(!this.isShowNoteEdit) return;
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
            const {title, bgColor, info} = this;
            this.currNote.title = title;
            this.currNote.info = info;
            this.currNote.style.bgColor = bgColor;
            this.$emit('saveNote',this.currNote);
            this.title='';
            this.info = {};
            this.bgColor='';
        },
        closeNoteEdit(){
            this.$emit('closeNoteEdit');
        },
        
        setNoteType(noteType) {
            
            if(this.noteType === noteType) return;
            this.componentType = 'edit-'+ this.noteType;
            if(!this.$route.params.noteId) {
                this.getEmptyNote(noteType)
                return;
            }
            const id = this.$route.params.noteId;
            this.$emit('setNoteType', {noteType,id, bgColor:this.bgColor});
        },
        getEmptyNote(noteType){
            console.log(noteType);

            this.$emit('getEmptyNote',({noteType,bgColor:this.bgColor}));
        },
        showNoteDetails(){
            const {title,info,type,style:{bgColor}} = this.currNote;
            if(type==='noteTodo'){
                const todos = info.todos.map(todo => {
                    const {txt,doneAt,id} = todo
                    return {txt,doneAt,id};
                })
                this.info= {todos};
            }else this.info={...info};
            
            this.title = title;
            this.noteType=type;
            this.bgColor = bgColor;
            this.componentType = 'edit-'+type;
        },
        approveDeleteNote(){
            if(this.isShowNoteEdit) this.isShowDeleteApproval=true;
        },
        deleteNote(isDeltedApproved){
            this.isShowDeleteApproval=false;
            if(isDeltedApproved) this.$emit('deleteNoteById',this.currNote.id)
        },
        openAddNewNote(){
            this.$emit('openAddNewNote')
        },
        // copyNote(){

        // }
    },
    computed: {
        style(){
            return {'background-color':this.bgColor}
        },
    },
    components:{
        noteFooter,
        editNoteImg,
        editNoteTodo,
        editNoteTxt,
        noteDelete
    }
}