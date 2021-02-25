export default{
    props:['task'],
    template:`
    <div class="todo preview flex">
        <p :class="{'checked':isCheckTask}">{{task.txt}}</p>
    </div>
    `,
    data(){
        return{
            isCheckTask:this.task.doneAt
        }
    },
    watch:{
        task(){
            console.log(task);
            console.log(this.task.doneAt);
            this.isCheckTask=this.task.doneAt
        }
    }
    // methods:{
    //     toggleCheckTask(){
    //         console.log(this.isCheckTask);
    //         // this.isCheckTask = ! this.isCheckTask;
    //     },
    // },

}