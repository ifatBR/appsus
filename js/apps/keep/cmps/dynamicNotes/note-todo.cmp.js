import todoPreview from './note-todo-preview.cmp.js'
export default{
    props:['info'],
    template:`
    <div>   
       <ul class="clean-list todo-list">
           <li v-for="(task) in info.todos" :key="task.id">
                <todo-preview :task="task"/>
            </li>
        </ul>
    </div>
    `,
    components:{
        todoPreview
    }
}