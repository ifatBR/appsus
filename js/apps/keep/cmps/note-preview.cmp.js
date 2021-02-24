export default{
    props:['note'],
    template:`
    <section class="note" :class="classColor">  
        <h1>preview</h1>  
        <h2>{{note.headline}}</h2>
    </section>
    `,
    data(){
        return{
            color:null,
        }
    },
    created(){
        this.color = this.note.style.bgColor;
        // console.log('note:', this.note)
    },
    computed:{
        classColor(){
            return 'note-'+this.note.style.bgColor
        }
    }
}