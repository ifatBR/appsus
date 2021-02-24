import todoPreview from './todo-preview.cmo.js'
export default{
    props:['info'],
    template:`
    <div>   
       <ul class="clean-list">
           <li v-for="(task) in info.todos">
                <todo-preview :task="task"/>
            </li>
            </ul>
    </div>
    `,

    components:{
        todoPreview
    }
}