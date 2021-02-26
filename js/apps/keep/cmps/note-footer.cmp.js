export default {
    template: `
    <section class="note-footer flex space-between"> 
        <datalist id="colorList">
            <option value="#CDE6E7"></option>
            <option value="#C6D7DD"></option>
            <option value="#C1B2CF"></option>
            <option value="#BFC0D4"></option>
            <option value="#CBA2B8"></option>
        </datalist>
        <div>
            <button @click.stop="closeNoteEdit" type="button" class="btn-edit close">Close</button>
            <button class="btn-edit save">Save</button>
        </div>
        <button class="btn-edit btn-fa btn-color"><input @change="setBgColor" type="color" v-model="color" value="#BFC0D4" list="colorList" /></button>
        <div class="note-exist">
            <button @click="noteIdToDelete" type="button" class="btn-edit btn-fa btn-del"></button>
        </div>
        <div class="note-types">
            <button @click="setNoteType('noteTxt')" type="button" class="btn-edit btn-fa btn-txt"></button>
            <button class="btn-edit btn-fa btn-img" @click="setNoteType('noteImg')"></button>
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
        noteIdToDelete() {
            this.$emit('noteIdToDelete');
        },
        setBgColor() {
            this.$emit('changeBgColor', this.color);
        },
        setNoteType(noteType, url=null) {
            this.$emit('setNoteType', {noteType,url});
        },
    },
};
