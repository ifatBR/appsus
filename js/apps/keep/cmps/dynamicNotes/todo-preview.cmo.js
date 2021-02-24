export default{
    props:['task'],
    template:`
    <div>
        <input type="checkbox" @input="toggleCheckTask" v-model="isCheckTask"/>
        <p :class="{'checked':isCheckTask}">{{task.txt}}</p>
    </div>
    `,
    data(){
        return{
            isCheckTask:false
        }
    },
    methods:{
        toggleCheckTask(){
            console.log(this.isCheckTask);
            // this.isCheckTask = ! this.isCheckTask;
        },
    },

}