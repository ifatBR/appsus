export default {
    template: `
    <section class="note-footer flex"> 
        <datalist id="colorList">
            <option value="#ffffff"></option>
            <option value="#6F8EFE"></option>
            <option value="#FE6F6F"></option>
            <option value="#FEAC3F"></option>
            <option value="#B5FF66"></option>
            <option value="#E183FF"></option>
        </datalist>
        <button >Save</button>
        <button @click="closeNoteEdit" type="button">Close</button>
        <button class="btn-edit btn-fa btn-color"><input @change="setBgColor" type="color" v-model="color" list="colorList" /></button>
        <div class="note-exist">
            <button @click="noteIdToDelete" type="button" class="btn-edit btn-fa btn-del"></button>
        </div>
        <div class="note-new">
            <button @click="setNoteType('noteTxt')" type="button" class="btn-edit btn-fa btn-txt"></button>
            <button class="btn-edit btn-fa btn-img"><input type="file" class="file-input absolute-full" name="image" @change="setNoteImg" /></button>
            <button @click="setNoteType('noteTodo')" type="button" class="btn-edit btn-fa btn-todo"></button>
        </div>
    </section>
    `,
    data() {
        return {
            color: '#ffffff',
            imgData:null
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
        setNoteImg(ev) {
            var reader = new FileReader();
            reader.onload = (event) => {
                this.imgData = event.target.result;
            }
            reader.readAsDataURL(ev.target.files[0])     
        },
    },
    watch:{
        imgData(){  
            this.setNoteType('noteImg',this.imgData)
        }
    }
};
