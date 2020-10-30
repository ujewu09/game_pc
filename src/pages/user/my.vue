<template>
    <div class="page-my">
        <header>
            <h1>个人设置</h1>
            <div class="tabs">
                <el-tabs  v-model="activeName"  @tab-click="routerSkip" >
                    <el-tab-pane v-for="(item,index) in myList" :key="index" :label=item.title :name=item.name >  
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
             myList:[
                {
                    title:'个人资料',
                    name:'myInfo',
                },
                 {
                    title:'安全设置',
                    name:'mySetting',
                },
                 {
                    title:'个性化',
                    name:'personal',
                },
            ],
            activeName:'',
        }
    },
    created(){
        if(this.$router.app._route.name.slice(9)){
            this.activeName =this.$router.app._route.name.slice(9);
        }
    },
    methods:{
        routerSkip(tab){
            this.$router.replace('/user/my/'+tab.name)
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
@import url('../../assets/modifyStyle.less');
.page-my{
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