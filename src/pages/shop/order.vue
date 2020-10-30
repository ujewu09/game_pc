<template>
    <div class="page-record">
        <div class="content">
            <header>
                 <h1>兑换记录</h1>
            </header>
            <div class="tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick" >
                    <el-tab-pane v-for="(item,index) in tabs" :key="index" :label=item.title  :name=item.name>
                        <div class="titles">
                            <p>
                                <span class="goods">商品</span>
                                <span class="price">金额</span>
                                <span class="status">交易状态</span>
                                <span class="coopreate">操作</span>
                            </p>
                        </div>
                        <div class="main"  v-if="orderList.length > 0" >
                            <div class="goods_list" v-for="(item,index) in orderList" :key="index" >
                                <ComponentGoodsDetail :data="item" ></ComponentGoodsDetail>
                            </div>
                        </div>
                        <div class="noText" v-else>当前暂无兑换记录，快去<span class="shop" @click="$router.push({'path':'goods'})">商城</span>兑换吧！</div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="pages">
            <el-pagination
            :page-size= limit
            :pager-count='5'
            :current-page= page
            layout="prev, pager, next"
            @current-change="changePage"
            :total= totals >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import ComponentGoodsDetail from '../../components/ComponentGoodsDetail'
export default {
    components:{
        ComponentGoodsDetail
    },
    data() {
      return {
        tabs:[
            {
                title:'全部',
                name:'-1'
            },
            {
                title:'兑换中',
                name:'0'
            },
            { 
               title:'待发货',
                name:'1'
            },
            {
               title:'已发货',
               name:'2'
            },
            {
                title:'已完成',
                name:'3'
            }
            ],
        activeName: '-1',
        status: -1,
        orderList:[],
        page:1,
        limit:5,
        totals:0
      };
    },
    created(){
        this.getOrderList();
    },
    methods: {
      handleClick(tab) {
        this.status = Number(tab.name);
        this.page  = 1;
        this.getOrderList();
      },
      getOrderList(){
        this.$http.post(this.config.HOST + "api/order/list",{
                page:this.page,
                limit:this.limit,
                status:this.status,
            })
            .then(response => {
                if(response.data.code == 0 ){
                    this.orderList = response.data.data;
                    //总条数
                    this.totals = response.data.total_page * this.limit;
                }else{
                    console.error(response.data.msg);
                }
        })
      },
     
      changePage(currentPage){
          this.page = currentPage;
          this.$http.post(this.config.HOST + "api/order/list",{
                page:this.page,
                limit:this.limit,
                status:this.status,
            })
            .then(response => {
                if(response.data.code == 0 ){
                    this.orderList = response.data.data;
                }else{
                    console.error(response.data.msg);
                }
            })
        },
    }
}
</script>
<style lang="less" scoped>
 @import url('../../assets/style.less');
  @import url('../../assets/modifyStyle.less');
    .page-record{
        width:924px;
        margin:auto;
        .content{
            height:1290px;
            header{
                height:112px;
                background-color:@color-line;
                h1{
                    font-size: 32px;
                    color:#fff;
                    margin-bottom: 30px;
                    padding:40px 0 0 60px;
                }
            }
            .tabs{
                    height:1400px;
                    &::v-deep .el-tabs__nav-wrap::after{
                        background: transparent;
                    }
                    &::v-deep .el-tabs__header {
                        font-size: 16px;
                        margin: 0 0 2px;
                        background:@color-line;
                    }
                    &::v-deep #tab-first{
                        padding-left: 0px !important;
                    }
                    &::v-deep [role="tab"] {
                        padding: 0 35px !important;
                        color:@color-used;
                        font-size: 16px;
                    }
                    &::v-deep [aria-selected="true"] {
                        color: #FFFFFF;
                    }
                    &::v-deep .el-tabs__active-bar {
                        background-color: @color-select;
                        transform: translateX(133px);
                    }
                    &::v-deep .el-tabs__nav-scroll{
                        margin-left:30px;
                    }
            }
            .titles{
                height:40px;
                background-color:@color-line;
                margin:3px 0;
                padding: 0 0 0 203px;
                p{
                    display: flex;
                    justify-content: flex-start;
                    line-height: 40px;
                    color:@color-two-level;
                    font-size: 14px;
                    .goods{
                        margin-right: 305px;
                    }
                    .price,.status{
                        margin-right: 100px;
                    }
                }
            }
            .noText{
                color:#fff;
                font-size:18px;
                text-align:center;
                margin:50% auto;
                .shop{
                    color:#27F3CB;
                    margin:0 3px;
                    font-size:20px;
                    cursor:pointer;
                }
            }
        }
        .pages{
            display: flex;
            justify-content: center;
            padding:10px 0;
        }    
    }
</style>