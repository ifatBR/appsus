export default {
    props: ['info'],
    template: `
        <div class="edit-note-txt">
            <pre>{{txtCopy}}</pre>
            <textarea class="free-txt" rows="1" v-model="info.txt" placeholder="Write something...">{{txtCopy}}</textarea>
        </div>
    `,
    computed: {
        txtCopy() {
            const t = this.info.txt;
            
            return this.info.txt;
        },
    },
};
