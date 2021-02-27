import { keepService } from '../services/keep.service.js';
import noteFooter from './note-footer.cmp.js'
import editNoteImg from './dynamicNotes/edit-note-img.cmp.js'
import editNoteTodo from './dynamicNotes/edit-note-todo.cmp.js'
import editNoteTxt from './dynamicNotes/edit-note-txt.cmp.js'
import noteDelete from './note-delete.cmp.js'
import notePin from './note-pin.cmp.js';

export default {
    props:['currNote','isShowNoteEdit','isDeletedPage'],
    template: `
    <section class="note-edit" v-bind:style="style" @click="openAddNewNote">
        <h2 v-if="!isShowNoteEdit" class="add-note-headline">Add a note. . .</h2>
        <form @submit.prevent="saveNote" class="flex column" >
            <note-pin v-if="isShowNoteEdit&&!isDeletedPage" :note="this.currNote"/>
            <input v-if="isShowNoteEdit" type="text" class="title" v-model="title" placeholder="title"/>
            <component v-if="isShowNoteEdit" :isShowNoteEdit="isShowNoteEdit" class="note-edit-component" :is="componentType" :info="info" ></component>    
            <note-footer v-if="isShowNoteEdit" :isDeletedPage="isDeletedPage" @saveNote="saveNote" @changeBgColor="changeBgColor" @setNoteType="setNoteType" @closeNoteEdit="closeNoteEdit" @deleteNote="approveMoveToDeleted" @deletePermanently="approveDeletePermanently" />
        </form>
        <note-delete :question="question" @approve="deleteNote" />
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
            question:null
        }
    },
    created(){
        if(!this.isShowNoteEdit) return;
        this.showNoteDetails()
    },
    methods:{
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
        openAddNewNote(){
            this.$emit('openAddNewNote')
        },
        approveMoveToDeleted(){
            if(this.isShowNoteEdit) this.question='Move to deleted page?';
        },

     
        approveDeletePermanently(){
            this.question='Delete permanently?';
        },
        deleteNote(answers){
            const {isQuestApproved, isPermanent} = answers
            this.question=null;
            if(!isQuestApproved) return;
            if(isPermanent){
                 this.$emit('deletePermanently',this.currNote.id)
                return
            }
            this.$emit('deleteNoteById',this.currNote.id)


        }
        // copyNote(){

        // }
    },
    computed: {
        style(){
            return {'background-color':this.bgColor}
        },
        // isDeletedPage(){
        //     return this.$route.fullPath.includes('delete')
        // }
    },
    components:{
        noteFooter,
        editNoteImg,
        editNoteTodo,
        editNoteTxt,
        noteDelete,
        notePin
    }
}