import noteList from '../cmps/note-list.cmp.js';

export default {
    template: `
    <section class="">   
            <note-list :isShowDeleted="true" :isShowPinned="false"/>
            <button @click="setUrlQuery">url query</button><!--DELETE LATER-->
    </section>
    `,
    created() {
        if (this.$route.query) console.log(this.$route.query);
    },
    methods: {
        setUrlQuery() {//DELETE LATER
            this.$router.push({ path: '/keep/notes', query: { title: 'very important', txt: 'dont forget to take the dog' } });
        },
    },
    components: {
        noteList,
    },
};
