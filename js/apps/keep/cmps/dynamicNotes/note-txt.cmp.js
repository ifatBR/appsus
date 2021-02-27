export default{
    props:['info'],
    template:`
    <div>   
        <p>{{txtToShow}}</p>
    </div>
    `,
    computed:{
        txtToShow(){
            if(this.info.txt.length > 200){
                return this.info.txt.substring(0,200)+'. . .'
            }
            return this.info.txt
        }
    }
}