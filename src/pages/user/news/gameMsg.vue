<template>
    <div class="user-news-gameMsg">
        <ComponentNews :msgList= gameMsgList></ComponentNews>
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
            gameMsgList:[]
        }
    },
    created(){
        this.$store.dispatch('NEWS_DATA',{
        }).then(responese=>{
            if(responese.data){
                this.$store.state.active.systemMsgData;
                let list = responese.data.msgList;
                for(var i in list){
                    if(list[i].typeMax == 2){
                        this.gameMsgList.push(list[i]);                      
                    }  
                }
            }
        })
    }
}
</script>
<style lang="less" scoped>
   .user-news-gameMsg{
       padding:60px;
   }
</style>