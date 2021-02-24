import noteFooter from './note-footer.cmp.js'

export default{
    props:['note'],
    template:`
    <section class="note" :class="classColor">  
        <h2>{{note.title}}</h2>
        <p>{{note.info.txt}}</p>
        <note-footer/>
    </section>
    `,
    data(){
        return{
            color:null,
        }
    },
    created(){
        this.color = this.note.style.bgColor;
        
    },
    computed:{
        classColor(){
            return 'note-'+this.note.style.bgColor
        }
    },
    components:{
        noteFooter
    }
}