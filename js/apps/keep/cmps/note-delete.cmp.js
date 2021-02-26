export default {
    template: `
    <div class="delete-approve flex align-center">
        <h3>Really delet?</h3>
        <button class="btn-no" @click="deleteApproved(false)">No</button>
        <button class="btn-yes" @click="deleteApproved(true)">Yes</button>
    </div>`,
    methods:{
        deleteApproved(isDeleteApproved){
            this.$emit('deleteNote',isDeleteApproved)
        }
    }
    
}