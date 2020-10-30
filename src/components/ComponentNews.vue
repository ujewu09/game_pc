<template>
    <div>
         <div class="news_condition">
            <div class="condition">
                <li @click="choose(0)">
                    <img :src="type==0?img3:img4">
                    <span :class="{'span1':type == 0}">全部</span>
                </li>
                <li @click="choose(1)">
                    <img :src="type==1?img3:img4">
                    <span :class="{'span1':type == 1}">未读</span>
                </li>
                <li @click="choose(2)">
                    <img :src="type==2?img3:img4">
                    <span :class="{'span1':type == 2}">已读</span>
                </li>
            </div>
            <button class="allRead" @click="allRead">全标为已读</button>
        </div>
        <div class="news_details">
            <p>信息列表</p>
        </div>
        <div class="news_title">
            <p><span class="time">时间</span><span class="title">标题</span></p>
        </div>
        <div class="news_list">
            <div v-for="item in msgList" :key="item.id">
                <div v-if="type == 0">
                    <p @click="getActivity(item)">
                        <img v-if="item.mailStatus == 0" src="../assets/images/xiaoxiyidu.png"  class="read">
                        <img v-if="item.mailStatus == 1" src="../assets/images/xiaoxiweidu.png" class="read">
                        <span class="newsTime">{{item.mailTime}}</span> <span class="newsTitle">{{item.title}}</span>
                    </p>
                </div>
                <div v-if="type == 1 && item.mailStatus == 1 ">
                    <p @click="getActivity(item)">
                        <img  src="../assets/images/xiaoxiweidu.png" class="read">
                        <span class="newsTime">{{item.mailTime}}</span> <span class="newsTitle">{{item.title}}</span>
                    </p>
                </div>
                <div v-if="type == 2 && item.mailStatus == 0 ">
                    <p @click="getActivity(item)">
                        <img  src="../assets/images/xiaoxiyidu.png"  class="read">
                        <span class="newsTime">{{item.mailTime}}</span> <span class="newsTitle">{{item.title}}</span>
                    </p>
                </div>
            </div>
            <el-dialog
                :visible="centerDialogVisible"
                width="22%"
                :title= title
                center>
                <span>{{msg}}</span>
                <span slot="footer" class="dialog-footer">
                <span v-if="show" @click="godetail(router)">查看详情</span>
                <span @click="centerDialogVisible = false">确 定</span>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        msgList:Array,
    },
    data(){
        return{
            type:0,
            img1: require('../assets/images/xiaoxiweidu.png'),
            img2: require('../assets/images/xiaoxiyidu.png'),
            img3: require('../assets/images/player_icon_recharge_selected.png'),
            img4: require('../assets/images/player_icon_recharge_normal.png'),
            centerDialogVisible: false,
            title:'',
            msg:'',
            show:true,
            router:'',
            newsType:1,
        }
    },
    created(){
        let path = this.$route.path.slice(11);
        switch(path){
            case 'systemMsg':
                this.newsType = 1;
                break;
            case 'gameMsg' :
                this.newsType = 2;
                break;
            case 'newsMsg' :
                this.newsType = 3;
                break;
        }
    },
    methods:{
        choose(e){
            this.type = e;
        },
        getActivity(item) {
            this.$store.dispatch("CLICK_NEWS",{
                type:0,
                mailID:item.mailID
            });
            this.centerDialogVisible = true;

            this.title = item.title,
            this.msg =item.msg

            item.mailStatus = 0;
            // this.$store.dispatch('NEWS_DATA',{}).then();
            if(item.typeMax == 1){
                switch(item.typeMin){
                    case 1:
                        this.router = '/user/wallet/dealRecords';
                        break;
                    case 3:
                        this.router = '/user/invite/myReward';
                        break;
                    case 4:
                        this.router = '/user/invite/myInvite';
                        break;
                    case 5:
                        this.router = '/user/invite/myInvite';
                        break;
                    case 7:
                        this.router = '/user/task';
                        break;
                    case 8:
                        this.router = '/user/task';
                        break;
                    case 9:
                        this.show = false;
                        break;
                    case 10:
                        this.router = '/shop/order';
                        break;
                    case 11:
                        this.router = '/shop/order';
                        break;
                }
            }else if(item.typeMax == 2){
                switch(item.typeMin){
                    case 1:
                        this.router = '/home/match';
                        break;
                    case 2:
                        this.show = false;
                        break;
                }
            }else{
                switch(item.typeMin){
                    case 1:
                        this.show = false;
                        break;
                }
            }
        },
        godetail(router){
            this.$router.replace(router)
        },
        //全部标为已读
        allRead(){   
            this.$store.dispatch("CLICK_NEWS",{
                type:this.newsType,
            });  
            for(var i in this.msgList){
                this.msgList[i].mailStatus = 0;
            }
        }
    },
    // computed:{
    //     systemMsgDataNews(){
    //         return this.$store.state.systemMsgDataNews
    //     },
    //     systemMsgData(){
    //         return this.$store.state.systemMsgData
    //     }
    // },
}
</script>
<style lang="less" scoped>
 @import url('../assets/style.less');
    .news_condition{
        display: flex;
        align-items: center;
        .condition{
            flex:1;
            display: flex;
           li{
                width:100px;
                display: flex;
                align-items: center;
                img{
                    width: 16px;
                    height: 16px;
                }
                span{
                    font-size: 14px;
                    margin:0 0 0 10px;
                    color:@color-used;
                }
                .span1{
                    color:@color-select;
                }
           }
        }
        .allRead{
            outline:none;
            cursor: pointer;
            width:100px;
            height: 32px;
            text-align: center;
            background:none;
            line-height: 32px;
            border:1px solid #384460;
            border-radius: 4px;
            font-size: 14px;
            color:@color-used;
        }
    }
    .news_details{
        margin-top: 16px;
        p{
            font-size: 16px;
            color:#fff;
            span{
                color:#506180;
                font-size: 12px;
                margin: 0 0 0 10px;
            }
        }
    }
    .news_title{
        margin: 16px 0 16px 0;
        p{
            font-size: 12px;
            color:#506180;
            margin-left: 94px;
            .time{
                display: inline-block;
                width: 202px;
            }
            span:nth-last-of-type(1){
                margin: 0 0 0 -37px;
            }
        }
    }
    .news_list{
        height:564px;
        overflow-y: auto;
        position: relative;
        /deep/.el-dialog--center{
            width: 22%;
            // height: 270px;
            background:#222d41;
            border-radius: 6px;
            color: #fff;
        }
        /deep/.el-dialog__headerbtn{
            display: none;
        }
        /deep/.el-dialog__header{
            text-align: center;
            font-size: 16px;
            span{
                color:@color-used;
            }
        }
        /deep/.el-dialog__body{
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 25px;
            color:@color-tip;
            //  height: 100px;
        }
        /deep/.el-dialog__footer{
            height: 45px;
            border-top: 2px #303c54 solid;
            .dialog-footer{
                display: flex;
                align-items: center;
                justify-content: space-around;
            }
        }
        p{
            font-size: 14px;
            color:@color-used;
            margin:10px 0;
            .newsTime{
                display: inline-block;
                width: 200px;
            }
            span{
                vertical-align: middle;
                cursor: pointer;
                margin-left: 20px;
            }
            .read{
                vertical-align: middle;
                cursor: pointer;
            }
        }
    }
    //优化滚动条
    .news_list::-webkit-scrollbar {
        width: 4px;
    }
    .news_list::-webkit-scrollbar-thumb {
        border-radius: 10px;
        // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    .news_list::-webkit-scrollbar-track {
        // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
    .pagination{
        display: flex;
        justify-content: center;
    }
</style>