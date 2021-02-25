export default {
    props:['info'],
    template:`
        <div>
            <textarea class="free-txt" rows="2" cols="50" v-model="info.txt" placeholder="Write something..."></textarea>
        </div>
    `
    }