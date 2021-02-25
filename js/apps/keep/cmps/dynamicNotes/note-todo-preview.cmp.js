export default{//delete me!!!!
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
            console.log(this.task);
            console.log(this.task.doneAt);
            this.isCheckTask=this.task.doneAt
        }
    }


}