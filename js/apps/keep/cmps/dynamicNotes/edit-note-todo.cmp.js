import editTodoPrev from './edit-note-todo-preview.cmp.js';
import { eventBus } from '../../../../services/event-bus.service.js';

export default {
    props: ['info'],

    template: `
    <div>
        <ul class="todo edit clean-list">
            <li v-for="(task) in info.todos" :key="task.id" :class="{bullets:isDeletedPage}">
                <edit-todo-prev :isDeletedPage="isDeletedPage" :task="task" @removeTask="removeTask"/>
            </li>
        </ul>
        <button v-if="!isDeletedPage" @click="addNewTask" type="button">+</button>
    </div>
    `,
    created(){
        eventBus.$on('newTaskForAdding', this.addTaskToInfo)
    },
    methods: {
        removeTask(id) {
            const idx = this.info.todos.findIndex((task) => task.id === id);
            this.info.todos.splice(idx, 1);
        },
        addNewTask(){
            eventBus.$emit('addNewTask')
        },
        addTaskToInfo(emptyTask){
            this.info.todos.push(emptyTask)
        }
    },
    computed:{
        isDeletedPage(){
         return this.$route.path.includes('deleted')
        }
    },

    components: {
        editTodoPrev,
    },
};
