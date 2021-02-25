export default {
    props:['info'],
    template:`
        <div>
            <textarea class="free-txt" rows="2" v-model="info.txt" placeholder="Write something..."></textarea>
        </div>
    `,
    created(){
        console.log('created txt edit',this.info);
    },
    }