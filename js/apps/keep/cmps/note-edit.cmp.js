import { keepService } from '../services/keep.service.js';
import noteFooter from './note-footer.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js';
import editNoteImg from './dynamicNotes/edit-note-img.cmp.js'
import editNoteTodo from './dynamicNotes/edit-note-todo.cmp.js'
import editNoteTxt from './dynamicNotes/edit-note-txt.cmp.js'

export default {
    props:['currNote','isShowNoteEdit'],
    template: `
    <section class="note-edit" v-bind:style="style" @click="openAddNewNote">
        <form @submit.prevent="saveNote" class="flex column" >
                <button v-if="isShowNoteEdit" class="btn-pin-note" @click="pinNote" type="button">📌</button>
                <input v-if="isShowNoteEdit" type="text" class="title" v-model="title" placeholder="title"/>
                <component :isShowNoteEdit="isShowNoteEdit" class="note-edit-component" :is="componentType" :info="info" ></component>    
            <note-footer v-if="isShowNoteEdit" @saveNote="saveNote" @changeBgColor="changeBgColor" @setNoteType="setNoteType" @closeNoteEdit="closeNoteEdit" @noteIdToDelete="noteIdToDelete"/>
        </form>
    </section>
    `,
    data(){
        return{
            // tempNote:{},
            noteType:'',
            bgColor: '',
            title:'',
            info:{},
            componentType:'edit-note-txt',
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
            const {title, bgColor} = this;
            this.currNote.title = title;
            this.currNote.info = this.info;
            this.currNote.style.bgColor = bgColor;
            this.$emit('saveNote',this.currNote);
            this.title='';
            this.info = {};
            this.bgColor='';
        },
        closeNoteEdit(){
            this.$emit('closeNoteEdit');
        },
        
        // setNoteType(params) {
        //     console.log('selected note type:',this.noteType);
        //     this.noteType= params.noteType;
        //     this.componentType = 'edit-'+ this.noteType;
        //     if(!this.$route.params.noteId) {
        //         this.getEmptyNote(params)
        //         return
        //     }
        //     params['id'] = this.noteId
        //     this.getEmptyNote(params)
        //     ;
        // },
        setNoteType(params) {
            // console.log('selected note type:',this.noteType);
            this.noteType= params.noteType;
            this.componentType = 'edit-'+ this.noteType;
            if(!this.$route.params.noteId) {
                this.getEmptyNote(params)
                return;
            }
            params['id'] = this.$route.params.noteId;
            this.$emit('setNoteType', params);
        },
        getEmptyNote(params){
            this.$emit('getEmptyNote',params);
        },
        showNoteDetails(){
            if(!this.isShowNoteEdit) return;
            const {title,info,type,style:{bgColor}} = this.currNote; 
            // console.log('currNote in edit',this.currNote);
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
        noteIdToDelete(){
            this.$emit('deleteNoteById',this.currNote.id)
        },
        openAddNewNote(){
            this.$emit('openAddNewNote')
        }
    },
    computed: {
        style(){
            return {'background-color':this.bgColor}
        },
        infoCopy(){
            return {...this.info}
        }
    },
    components:{
        noteFooter,
        editNoteImg,
        editNoteTodo,
        editNoteTxt
    }
}