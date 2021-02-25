export default{
    props:['info'],
    template:`
    <div class="flex preview-note-img-container">   
        <img :src="info.url" class="note-img"/>
    </div>
    `,
}