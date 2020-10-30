<template>
    <div class="page-invite">
        <header>
            <h1>邀请招募</h1>
            <div class="tabs">
                <el-tabs  v-model="activeName"  @tab-click="routerSkip" >
                    <el-tab-pane v-for="(item,index) in inviteList" :key="index" :label=item.title :name=item.name >  
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
             inviteList:[
                {
                    title:'我的邀请',
                    name:'myInvite',
                },
                 {
                    title:'我的奖励',
                    name:'myReward',
                },
                 {
                    title:'推广教程',
                    name:'course',
                },
            ],
            activeName:this.$router.app._route.name.slice(13)
        }
    },
     methods:{
        routerSkip(tab){
           this.$router.replace('/user/invite/'+tab.name)
        }
    },
    watch:{
        $route:function(now){
            var index =now.name.lastIndexOf('/')
            this.activeName = now.name.substring(index+1)
        },
    }
}
</script>
<style lang="less" scoped>
@import url('../../assets/style.less');
@import url('../../assets/modifyStyle.less');
.page-invite{
    // /deep/ .el-tabs--top{
    //     position: relative;
    //     left: -60px;
    // }
    // /deep/ .el-tabs__nav-scroll{
    //     margin: 0 0 0 52px;
    // }
    // /deep/.el-tabs__content{
    //     width: 923px;
    //     background: #0b0e1a;
    //     // border: 1px #262933 solid;
    //     margin-top: -10px;
    // }
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