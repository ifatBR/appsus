import editTodoPrev from './edit-note-todo-preview.cmp.js';
import { eventBus } from '../../../../services/event-bus.service.js';

export default {
    props: ['info'],

    template: `
    <div>
        <ul class="todo edit clean-list">
            <li v-for="(task) in info.todos" :key="task.id">
                <edit-todo-prev :task="task" @removeTask="removeTask"/>
            </li>
        </ul>
        <button @click="addNewTask" type="button">+</button>
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

    components: {
        editTodoPrev,
    },
};
