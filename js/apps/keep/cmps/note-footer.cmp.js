export default {
    template: `
    <section class="note-footer flex space-between"> 
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
        <button class="btn-edit btn-fa btn-color"><input @change="setBgColor" type="color" v-model="color" value="#BFC0D4" list="colorList" /></button>
        <div class="note-exist">
            <button v-if="isExistingNote" @click="deleteNote" type="button" class="btn-edit btn-fa btn-del"></button>
        </div>
        <div class="note-types">
            <button @click="setNoteType('noteTxt')" type="button" class="btn-edit btn-fa btn-txt"></button>
            <button class="btn-edit btn-fa btn-img" type="button" @click="setNoteType('noteImg')"></button>
            <button @click="setNoteType('noteTodo')" type="button" class="btn-edit btn-fa btn-todo"></button>
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
    },
    computed:{
        isExistingNote(){
            return this.$route.params.noteId;
        }
    }
};
