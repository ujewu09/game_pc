<template>
    <div class="page-wallet-dealRecords">
        <div class="record_query">
            <div class="condition_one">
                <span class="query_title">交易类型</span>
                <li @click="choose(0)">
                    <img :src="type==0?img1:img2">
                    <span :class="{'span1':type == 0}">全部</span>
                </li>
                <li @click="choose(1)">
                    <img :src="type==1?img1:img2">
                    <span :class="{'span1':type == 1}">充值</span>
                </li>
                <li @click="choose(2)">
                    <img :src="type==2?img1:img2">
                    <span :class="{'span1':type == 2}">兑换</span>
                </li>
                <li @click="choose(3)">
                    <img :src="type==3?img1:img2">
                    <span :class="{'span1':type == 3}">转账</span>
                </li>
                 <li @click="choose(4)">
                    <img :src="type==4?img1:img2">
                    <span :class="{'span1':type == 4}">其他</span>
                </li>
            </div>
            <div class="condition_two">
                <span class="query_title">交易状态</span>
                <li @click="chooseStatus(0)">
                    <img :src="status==0?img1:img2">
                    <span :class="{'span1':status == 0}">全部</span>
                </li>
                <li @click="chooseStatus(2)">
                    <img :src="status==2?img1:img2">
                    <span :class="{'span1':status == 2}">未完成</span>
                </li>
                <li @click="chooseStatus(1)">
                    <img :src="status==1?img1:img2">
                    <span :class="{'span1':status == 1}">已完成</span>
                </li>
            </div>
            <div class="condition_three">
                <span class="query_title">交易时间</span>
                <div class="block">
                    <el-date-picker
                    v-model="value1"
                    type="daterange"
                    value-format= timestamp
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <button @click="query">查询</button>
            </div>
        </div>
        <span class="line"></span>
        <div class="record_result">
            <p class="pay_record">充值记录<span>最近10条记录</span></p>
            <div class="result_title">
                <span class="title_one">流水号</span><span class="title_two">创建时间</span><span class="title_three">充值方式</span>
                <span class="title_four">充值金额</span><span class="title_six">附言</span><span class="title_seven">交易状态</span>
            </div>
            <div class="result_list">
                <li v-for="(item,index) in billList " :key="index">
                    <span class="title_one">{{item.orderNum}}</span>
                    <span class="title_two">{{item.billTime}}</span>
                    <span class="title_three">{{item.billType}}</span>
                    <span class="title_four">{{item.num}}</span>
                    <span class="title_six"></span>
                    <span class="title_seven" v-if="item.status == 0">处理中</span>
                    <span class="title_seven" v-if="item.status == 1">交易完成</span>
                    <span class="title_seven" v-if="item.status == 2">交易失败</span>
                </li>
            </div>
        </div>
        <div class="pagination">
            <el-pagination
            :page-size="10"
            :pager-count="5"
            :current-page= page
            @current-change="changePage"
            layout="prev, pager, next"
            :total= total>
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
   data(){
       return{
           img1: require('../../../assets/images/player_icon_recharge_selected.png'),
           img2: require('../../../assets/images/player_icon_recharge_normal.png'),
           type:0,
           status:0,
           value1:'',
           total:10,
           page:1
       }
   },
   computed:{
       billList(){
           return this.$store.state.dealRecords.billList;
       }
   },
   methods:{
        choose(e){
            this.type = e;
        },
        chooseStatus(e){
            this.status = e;
        },
        query(){
            this.$store.commit('DEAL_DATA',{})
            this.$store.dispatch('DEAL_DATA',{
                type:Number(this.type),
                status:Number(this.status),
                page:1,
                start_time:this.value1[0] / 1000,
                end_time:this.value1[1] / 1000
            }).then(responese=>{
                if(responese.code == 200 && responese.data.sum_page != 0 ){
                    // this.billList = responese.data.billList;
                    this.$store.commit('DEAL_DATA',responese.data.billList)
                    this.total = responese.data.sum_page
                }else if(responese.code == 200 && responese.data.sum_page == 0){
                    this.$message({
                        type:'warning',
                        message:"当前时间段暂无数据！"
                    })
                }
            })
        },
        changePage(currentPage){
            this.page =currentPage
            this.$store.dispatch('DEAL_DATA',{
                type:Number(this.type),
                status:Number(this.status),
                page:this.page,
                start_time:this.value1[0] / 1000,
                end_time:this.value1[1] / 1000
            }).then(responese=>{
                if(responese.code == 200 && responese.data.sum_page != 0 ){
                    // this.billList = responese.data.billList;
                    this.$store.commit('DEAL_DATA',responese.data.billList)
                    this.total = responese.data.sum_page
                }else if(responese.code == 200 && responese.data.sum_page == 0){
                    this.$message({
                        type:'warning',
                        message:"当前时间段暂无数据！"
                    })
                }
            })
        }
   }
}
</script>
<style lang="less" scoped>
@import url('../../../assets/style.less');
 .page-wallet-dealRecords{
        .record_query{
            padding:40px 0 0 20px;
            .condition_one,.condition_two,.condition_three{
                margin:0 0 40px 0;
                 .query_title{
                    font-size:16px;
                    color:#fff;
                    margin:0 30px 0 0;
                }
            }
            .condition_one,.condition_two{
                display: flex;
                align-items: center;
                color:@color-used;
                font-size: 14px;
                li{
                    display: flex;
                    align-items: center;
                    width:100px;
                    img{
                        width:16px;
                        height: 16px;
                    }
                    span{
                        margin:0 0 0 10px;
                    }
                    .span1{
                        color:@color-select;
                    }
                }
            }
            .condition_three{
                display: flex;
                align-items:center;
                /deep/.el-range-editor.el-input__inner{
                    width: 543px;
                    background:none;
                }
                /deep/.el-input__inner{
                    background:none;
                     color:#fff;
                }
                /deep/.el-input__inner:focus{
                     border-color:@color-select;
                }
                /deep/.el-range-editor .el-range-input{
                    background:none;
                    color:@color-tip;
                }
                /deep/.el-date-editor .el-range-separator{
                    color:@color-tip;
                }
                /deep/.el-range-editor.is-active, .el-range-editor.is-active:hover{
                    border-color:@color-select;
                }
                button{
                    width:92px;
                    height: 38px;
                    outline:none;
                    font-size: 16px;
                    color:#fff;
                    background:none;
                    border:1px solid #fff;
                    margin-left: 12px;
                    border-radius: 2px;
                }
            }
        }
        .line{
            display: inline-block;
            width:924px;
            height: 1px;
            background:#1c2236;
            margin: 0 0 0 -40px;
        }
        .record_result{
            padding:30px 30px 0 0;
            .pay_record{
                font-size:16px;
                color:#fff;
                font-weight: bold;
                margin:0 0 16px 0;
                span{
                    font-size:12px;
                    margin:0 0 0 8px;
                    color:#506180;
                }
            }
            .result_title,.result_list{
                font-size:12px;
                color:#506180;
                span{
                    display: inline-block;
                }
                .title_one,.title_two{
                    width:280px;
                }
                .title_two{
                    width:150px;
                }
                .title_three,.title_four{
                    width:120px;
                    text-align: center;
                }
                .title_five{
                    width:110px;
                    text-align: center;
                }
                .title_six{
                    width:90px;
                    text-align: center;
                }
                .title_seven{
                    width:80px;
                    text-align: center;
                }
            }
            .result_list{
                height:352px;
                margin:10px 0 25px 0;
                li{
                    font-size:14px;
                    color:#fff;
                    margin:18px 0;
                }
            }
           
        }
        .pagination{
            display: flex;
            justify-content: center;
        }
    }
</style>