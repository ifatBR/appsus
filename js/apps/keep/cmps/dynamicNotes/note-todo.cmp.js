import todoPreview from './note-todo-preview.cmp.js'
export default{
    props:['info'],
    template:`
    <div>   
       <ul class="clean-list todo-list">
           <li v-for="(task) in info.todos" :key="task.id">
           <p :class="{'checked':task.doneAt}">{{task.txt}}</p>
            </li>
        </ul>
    </div>
    `,
    components:{
        todoPreview
    }
}