<template>
    <div class="page-wallet">
        <header>
            <h1>钱包</h1>
            <div class="tabs">
                <el-tabs v-model="activeName"  @tab-click="routerSkip" >
                    <el-tab-pane v-for="(item,index) in walletList" :key="index" :label=item.title :name=item.name >  
                    </el-tab-pane>
                </el-tabs>
            </div>
        </header>
        <div class="content"><router-view /></div>
    </div>
</template>
<script>
export default {
    props:{
        data:{
            type:String,
            required:true,
        }
    },
    data(){
        return{
            walletList:[
                {
                    title:'充值',
                    name:'recharge',
                },
                 {
                    title:'VIP支付',
                    name:'pay',
                },
                 {
                    title:'竞猜币兑换',
                    name:'exchange',
                },
                 {
                    title:'交易记录',
                    name:'dealRecords',
                },
                 {
                    title:'下单记录',
                    name:'orderRecords',
                },
            ],
           activeName:this.$router.app._route.name.slice(13),
        }
    },
    mounted() {
        if(this.data != ''){
            this.activeName = this.data;
        }
    },
    methods:{
        routerSkip(tab){
           this.$router.replace('/user/wallet/'+tab.name);
        },
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
.page-wallet{
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
        width:882px;
        padding:0 0 0 40px;
        min-height: 800px;
        background:@color-bg;
        border:1px solid #1c2236;
    }
}
</style>