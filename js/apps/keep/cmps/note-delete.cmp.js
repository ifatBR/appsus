export default {
    props: ['question'],
    template: `
    <div v-if="question" class="delete-approve flex align-center">
        <h3>{{question}}</h3>
        <button class="btn-no" @click="isApproved(false)">No</button>
        <button class="btn-yes" @click="isApproved(true)">Yes</button>
    </div>`,
    methods: {
        isApproved(isQuestApproved) {
            if (this.$route.path.includes('deleted')) {
                this.$emit('approve', {isQuestApproved, isPermanent:true});
                return;
            }
            this.$emit('approve', {isQuestApproved, isPermanent:false});
        },
    },
};
