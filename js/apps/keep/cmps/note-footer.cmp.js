export default {
    template: `
    <section class="note-footer"> 
        <!-- <img :src="imgData">  -->
        <datalist id="colorList">
            <option value="#ffffff"></option>
            <option value="#6F8EFE"></option>
            <option value="#FE6F6F"></option>
            <option value="#FEAC3F"></option>
            <option value="#B5FF66"></option>
            <option value="#E183FF"></option>
        </datalist>
        <button >Save</button>
        <!-- <button @click="saveNote(true)">Save</button> -->
        <button @click="closeNoteEdit" type="button">Close</button>
        <button><input @change="setBgColor" type="color" v-model="color" list="colorList" value="#ffffff"/></button>
        <div class="note-exist">
            <button @click="noteIdToDelete" type="button">Delete</button>
        </div>
        <div class="note-new">
            <button @click="setNoteType('noteTxt')" type="button">Text</button>
            <!-- <button @click="setNoteType('noteImg')">Image</button> -->
            <input type="file" class="file-input btn" name="image" @change="setNoteImg" />
            <button @click="setNoteType('noteTodo')" type="button">Todo</button>
        </div>
    </section>
    `,
    data() {
        return {
            color: 'white',
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
