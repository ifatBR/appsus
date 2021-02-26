export default {
    props:['info'],
    template:`
        <div class="edit-note-txt">
            <pre>{{info.txt}}</pre>
            <textarea class="free-txt" rows="1" v-model="info.txt" placeholder="Write something..."></textarea>
        </div>
    `,
    }