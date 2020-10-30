<template>
    <div class="page-news">
         <header>
            <h1>消息中心</h1>
            <div class="tabs">
                <el-tabs  v-model="activeName"  @tab-click="routerSkip" >
                    <el-tab-pane v-for="(item,index) in newsList" :key="index" :label=item.title :name=item.name>  
                    </el-tab-pane>
                </el-tabs>
            </div>
        </header>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            newsList:[
                {
                    title:'系统通知',
                    name:'systemMsg',
                },
                 {
                    title:'赛事提醒',
                    name:'gameMsg',
                },
                {
                    title:'消息提醒',
                    name:'newsMsg',
                },
            ],
            activeName:this.$router.app._route.name.slice(11),
        }
    },
    methods:{
         routerSkip(tab){
            this.$router.replace('/user/news/'+tab.name)
        }
    },
}
</script>
<style lang="less" scoped>
  @import url('./../../assets/style.less');
   @import url('./../../assets/modifyStyle.less');
.page-news{
    header{
        height:154px;
        background:#141926;
        padding:40px 0 0 60px;
        h1{
            font-size:40px;
            color:#fff;
            margin:0 0 55px 0;
        }
    }
    .content{
        margin:3px 0 0 0;
        min-height: 800px;
        background: #0b0e1a;
        border: 1px solid #1c2236;
    }
}
</style>