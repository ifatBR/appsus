import editTodoPrev from './edit-note-todo-preview.cmp.js';
export default {
    props: ['info'],

    template: `
    <div>
    <ul class="todo edit clean-list">
            <li v-for="(task) in info.todos" :key="task.id">
                <edit-todo-prev :task="task" @removeTask="removeTask"/>
            </li>
    </ul>
    </div>
`,
    methods: {
        removeTask(id) {
            console.log('id:', id)
            const idx = this.info.todos.findIndex((task) => task.id === id);
            this.info.todos.splice(idx, 1);
        },
        // toggleCheckTask(id){
        //     const idx = this.info.todos.findIndex((task) => task.id === id);
        //     const task = this.info.todos[idx];
        //     if(task.doneAt){
        //         task.doneAt =null;
        //         return
        //         }
        //         task.doneAt = Date.now();
        //         console.log(task.doneAt);
        // }
    },
    components: {
        editTodoPrev,
    },
};
