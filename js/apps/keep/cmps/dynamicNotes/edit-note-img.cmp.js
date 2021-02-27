export default {
    props: ['info'],
    template: `
        <div class="flex edit-note-img-container">
        <form v-if="!info.url" class="image-upload-container flex align-center" @submit.prevent>
                <input type="text" name="image-url" @change="setImageUrl" v-model="imgUrl" placeholder="type url"/> 
                <h3>or</h3> 
                <button type="button" class="btn-upload-image">upload-image<input type="file" class="file-input" name="image" @change="setNoteImg" placeholder="upload image"/></button>
            </form>
            <div class="img-container">
                <img v-if="info.url" :src="info.url" class="edit-note-img" alt="The link is broken"/>
                <input type="file" class="btn-change-img absolute-full" name="image" @change="setNoteImg" />     
            </div>

        </div>
    `,
    data() {
        return {
            imgData: null,
            imgUrl:null
        };
    },
    created(){
        // console.log('created img edit',this.info);
    },
    methods: {
        
        setNoteImg(ev) {
            console.log('changing img');
            var reader = new FileReader();
            reader.onload = (event) => {
                this.imgData = event.target.result;
            };
            reader.readAsDataURL(ev.target.files[0]);
        },
        setImageUrl(){
            console.log('url :)');
            this.info.url = this.imgUrl;
        }
    },

    watch: {
        imgData() {
            this.info.url = this.imgData;
        },
    },
};
