import { keepService } from '../services/keep.service.js';

export default {
    template: `
    <section class="note-edit flex column">
        <button @click="pinNote">📌</button>
        <input type="text" placeholder="title"/>
        <textarea laceholder="Text..."></textarea>
        <note-footer/>
    </section>
    `,
    methods:{
        pinNote(ev){
            console.log('ev:', ev)
        }
    }
}