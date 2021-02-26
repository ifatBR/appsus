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
            this.isCheckTask=this.task.doneAt
        }
    }


}