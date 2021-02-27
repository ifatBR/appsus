import { eventBus } from '../../../services/event-bus.service.js';

export default {
    props:['isDeletedPage'],
    template: `
    <section class="note-footer"> 
        <div class="flex space-between" v-if="!isDeletedPage">
            <datalist id="colorList">
                <option value="#fee7df"></option>
                <option value="#6ebfb9"></option>
                <option value="#bee1e5"></option>
                <option value="#f2c643"></option>
                <option value="#ebeae6"></option>
            </datalist>
            <div>
                <button @click.stop="closeNoteEdit" type="button" class="btn-edit close">Close</button>
                <button class="btn-edit save">Save</button>
            </div>
            <button  class="btn-edit btn-fa btn-color"><input @change="setBgColor" type="color" v-model="color" value="#BFC0D4" list="colorList" /></button>
            <button v-if="isNoteEditing" @click="deleteNote" type="button" class="btn-edit btn-fa btn-delete"></button>
            <div  class="note-types">
                <button @click="setNoteType('noteTxt')" type="button" class="btn-edit btn-fa btn-txt"></button>
                <button class="btn-edit btn-fa btn-img" type="button" @click="setNoteType('noteImg')"></button>
                <button @click="setNoteType('noteTodo')" type="button" class="btn-edit btn-fa btn-todo"></button>
            </div>
        </div>
        <div class="flex space-between" v-if="isDeletedPage">
            <button @click.stop="closeNoteEdit" type="button" class="btn-del close">Close</button>
            <button @click.stop="restoreNote" type="button" class="btn-del restore">Restore note</button>
            <button @click.stop="deletePermanently" type="button" class="btn-del del-permanent">Delete permanently</button>
        </div>
    </section>
    `,
    data() {
        return {
            color: '#BFC0D4',
        };
    },
    methods: {
        closeNoteEdit(){
            this.$emit('closeNoteEdit');
        },
        deleteNote() {
            this.$emit('deleteNote');
        },
        setBgColor() {
            this.$emit('changeBgColor', this.color);
        },
        setNoteType(noteType) {
            console.log('tp',noteType);
            this.$emit('setNoteType', noteType);
        },
        restoreNote(){
            eventBus.$emit('restoreNote',this.$route.params.noteId);
        },
        deletePermanently(){
            this.$emit('deletePermanently',this.$route.params.noteId);
        }
    },
    computed:{
        isNoteEditing(){
            return this.$route.params.noteId;
        }
    }
};
