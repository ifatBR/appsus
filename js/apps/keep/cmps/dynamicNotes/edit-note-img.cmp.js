export default {
    props: ['info'],
    template: `
        <div class="flex edit-note-img-container">
            <img :src="info.url" class="edit-note-img"/>
            <input type="file" class="btn-change-img absolute-full" name="image" @change="setNoteImg" />     
        </div>
    `,
    data() {
        return {
            imgData: null,
        };
    },
    created(){
        console.log('created img edit',this.info);
    },
    methods: {
        changeImg(ev) {
            console.log('changing img');
            if (!this.$route.params.noteId) {
            }
            
                return; 
            this.setNoteImg(ev);
        },
        setNoteImg(ev) {
            console.log('changing img');
            var reader = new FileReader();
            reader.onload = (event) => {
                this.imgData = event.target.result;
            };
            reader.readAsDataURL(ev.target.files[0]);
        },
    },

    watch: {
        imgData() {
            this.info.url = this.imgData;
        },
    },
};
