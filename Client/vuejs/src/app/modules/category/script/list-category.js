export default {
    data:()=>({
        showDialog: false,
        isLoading: false,
        isSubmit: false,
    }),
    methods:{
        reloadData() {
            this.searchForm = {
                role_id: null,
                status: null,
            }
            this.pagination = {
                perPage: null,
                current: 1,
                total: 0,
            }
            this.initData()
        },
        onDialogClose() {
            this.showDialog = false
            this.selectUser = null
        },
        dialogClose() {
            this.resetError();
            this.checkEmail=false;
            this.showDialog = false
        },
        showAddCategory(){
            this.showDialog=true
        }
    },
    mounted(){
        console.log('đã vào đây')
    }


};
