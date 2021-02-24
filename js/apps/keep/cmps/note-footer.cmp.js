export default {
    template: `
    <section class="note-footer">  
        <datalist id="colorList">
            <option value="#ffffff"></option>
            <option value="#6F8EFE"></option>
            <option value="#FE6F6F"></option>
            <option value="#FEAC3F"></option>
            <option value="#B5FF66"></option>
            <option value="#E183FF"></option>
        </datalist>
        <button @click="saveNote(true)">Save</button>
        <button @click="saveNote(false)">Close</button>
        <button><input @change="setBgColor" type="color" v-model="color" list="colorList" value="#ffffff"/></button>
        <button @click="deleteNote">Delete</button>
    </section>
    `,
    data() {
        return {
            color: 'white',
        };
    },
    methods: {
        saveNote(isSaveNote) {
            this.$emit('saveNote', isSaveNote);
        },
        deleteNote(){
            this.$emit('deleteNote');
        },
        setBgColor() {
            this.$emit('changeBgColor', this.color)
        },
    },
};
