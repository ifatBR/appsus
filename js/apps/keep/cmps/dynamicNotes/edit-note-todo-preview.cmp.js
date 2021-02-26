import { eventBus } from '../../../../services/event-bus.service.js';

export default{
    props:['task','isDeletedPage'],
    template:`
    <div class="flex align-center">
        <button v-if="!isDeletedPage" type="button" @click="removeTask">X</button>
        <input v-if="!isDeletedPage" name="checkbox" type="checkbox" @input="toggleCheckTask" v-model="isCheckTask"/>
        <input type="text" v-model="task.txt" :class="{'checked':isCheckTask}"/>
    </div>
    `,
    data(){
        return{
            isCheckTask:this.task.doneAt,
        }
    },
    methods:{
        toggleCheckTask(){
            this.$emit('toggleCheckTask', this.task.id)
            if(this.task.doneAt){
                this.task.doneAt =null;
                return
                }
                this.task.doneAt = Date.now();
                console.log(this.task.doneAt);
        },
        removeTask(){
            console.log('remove task');
            this.$emit('removeTask', this.task.id)
        }   
    },
}