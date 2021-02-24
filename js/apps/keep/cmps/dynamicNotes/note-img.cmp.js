export default{
    props:['info'],
    template:`
    <div class="flex">   
        <img :src="info.url" class="note-img"/>
    </div>
    `
}