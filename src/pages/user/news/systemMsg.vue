<template>
    <div class="user-news-systemMsg">
        <ComponentNews :msgList= systemMsgList ></ComponentNews>
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
            systemMsgList:[]
        }
    },
    created(){
        this.$store.dispatch('NEWS_DATA',{
        }).then(responese=>{
            if(responese.data){
                this.$store.state.active.systemMsgData;
                let list = responese.data.msgList;
                for(var i in list){
                    if(list[i].typeMax == 1){
                        this.systemMsgList.push(list[i]);                      
                    }  
                }
            }
        })
    }
}
</script>
<style lang="less" scoped>
.user-news-systemMsg{
    padding:60px;
}
</style>