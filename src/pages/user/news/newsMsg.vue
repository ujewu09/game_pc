<template>
    <div class="user-news-newsMsg">
        <ComponentNews :msgList= newsMsgList></ComponentNews>
    </div>
</template>
<script>
import ComponentNews from '../../../components/ComponentNews'
export default {
    components:{
        ComponentNews
    },
    data(){
        return{
            newsMsgList:[]
        }
    },
    created(){
        this.$store.dispatch('NEWS_DATA',{
        }).then(responese=>{
            if(responese.data){
                this.$store.state.active.systemMsgData;
                let list = responese.data.msgList;
                for(var i in list){
                    if(list[i].typeMax == 3){
                        this.newsMsgList.push(list[i]);                      
                    }  
                }
            }
            if(this.newsMsgList.length == 0){
                this.$message({
                    type:'warning',
                    message:'暂无消息'
                })
            }
        })
    }
}
</script>
<style lang="less" scoped>
.user-news-newsMsg{
    padding:60px;
}
</style>