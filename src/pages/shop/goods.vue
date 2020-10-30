<template>
    <div class="page-goods">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="itemp in list" :key="itemp.id" :label="itemp.name" :name="JSON.stringify(itemp.id)" >
                <div class="list" v-if="listContent.length > 0">
                    <div v-for="item in listContent" :key="item.id"  @click="onDetails(item)" :class="{'block': true, 'over': item.type != 0 }" >
                        <div class="leftTab">
                            {{item.goods_type == 1 && "虚拟" || 
                            item.goods_type == 2 && "实物"}}
                        </div>
                        <img width="85" height="85" :src="item.thumb_img" />
                        <h4 class="van-ellipsis">
                            {{item.goods_name}}
                        </h4>
                        <p>
                            等级 ≥  VIP
                            {{item.user_level}}
                            <span>
                                ({{item.type == 1 && "已达标" || item.type == 0 && "未达标"}})
                            </span>
                        </p>
                        <div>
                            <!-- <van-button plain hairline @click="onDetails(item)"
                                :disabled="item.type == 0"
                                class="btn-auto">
                                {{item.price}}竞猜币兑换</van-button> -->
                            <el-button :disabled="item.type == 0" @click="onDetails(item)" class="btn-auto">{{item.price}}竞猜币兑换</el-button>
                        </div>
                    </div>
                </div>
                <div class="noResult" v-else>暂无商品，敬请期待！</div>
            </el-tab-pane>
        </el-tabs>
        <div class="pagination">
            <el-pagination
                :page-size="pages.limit"
                :pager-count="5"
                :current-page="pages.page"
                layout="prev, pager, next"
                @current-change="pageChange"
                :total="pages.count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 0,
            list: [],
            listContent: [],
            pages: {
                page:1,
                limit: 12,
                count: 0
            }
        };
    },
    created() {
        this.$http
        .post(this.config.HOST + "api/category/list",{})
        .then(response => {
            let result = response.data;
            if (result.code == 0) {
                let { data } = result;
                if (data.length > 0) {
                    this.list = data;
                    this.activeName = JSON.stringify(data[0].id);
                    this.getShopList({
                        ...this.pages,
                        category_id: this.activeName 
                    });
                } else {
                    this.list = null;
                }
            }
        })
    },
    methods: {
        handleClick(tab) {
            this.pages.page = 1;
            this.pages.count = 0;
            this.listContent = [];
            this.getShopList({
                ...this.pages,
                category_id: tab.name
            });
        },
        pageChange(page) {
            this.pages.page = page;
            this.getShopList({
                ...this.pages,
                category_id: this.activeName
            });
        },
        onDetails(data) {
            if (data.type == 0) {
                return;
            }
            this.$router.push({ path: 'detail', query: { id: data.id }})
        },
        getShopList(obj, callback) {
            this.$http
            .post(this.config.HOST + "api/goods/list",obj).then(response => {
                let result = response.data;
                if (result.code == 0) {
                    let { data } = result;
                    if (data.length > 0) {
                        this.upLoading = false;
                        this.finished = false;
                        let modify = data;
                        // 赋值商品类型ID
                        for(let i = 0;i < modify.length; i++){
                            modify[i]._goodsType = obj.category_id;
                        }
                        this.pages.count =  obj.limit * result.total_page;
                        this.listContent = modify;
                    } else {
                        this.upLoading = true;
                        this.finished = true;
                    }
                } else {
                    this.upLoading = true;
                    this.finished = true;
                }
                if (callback) {
                    callback(result);
                }
            })
        },
    }
}
</script>
<style lang="less" scoped>
    @import url('../../assets/style.less');
    .page-goods {
        width: 940px;
        margin: auto;
        .list {
            max-height: 860px;
            display: flex;
            flex-wrap: wrap;
            padding: 8px;
            background-color: #0B0E1A;
            box-sizing: border-box;
            margin-top: 3px;
            .block{
                box-sizing: border-box;
                width: 222.5px;
                max-height: 272.66px;
                margin: 8px 0 0 0;
                padding: 30px 0 30px 0;
                text-align: center;
                position: relative;
                color:#ffffff;
                border-radius: 5px;
                background-color: #1D2538;
                margin: 4px;
                border: 1px solid #1D2538;
                h4 {
                    margin: 0;
                    padding: 30px 0 16px 0;
                    font-size: 16px;
                    color: #ffffff;
                }

                p{
                    padding: 0 0 8px 0;
                    margin: 0;
                    font-size: 12px;
                    color: #bacef1;
                    span{
                        color: #526583;
                        font-size: 12px;
                    }
                }

                .leftTab{
                    position: absolute;
                    top: 20px;
                    font-size: 12px;
                    padding: 3px 10px 3px 5px;
                    font-weight: bold;
                    line-height: 1.7em;
                    border-top-right-radius: 12px;
                    border-bottom-right-radius: 12px;
                    background-color: #1C5D93;
                }

                .btn-auto{
                    height: 34px;
                    width: 156px;
                    padding: 0 8px;
                    border: transparent;
                    background-image: linear-gradient(-90deg, #069ee7, #07e2c6);
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: bold;
                    border-radius: 2px;
                    &[disabled="disabled"]{
                        background-image:none;
                        background-color: transparent;
                        border:1px solid #3b465f;
                        color: #526583;
                    }
                    .van-button__text{
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }
                &:hover {
                    border-color: #28ffd4;
                }
            }
            
        }
        .noResult{
            color:#fff;
            font-size:18px;
            text-align:center;
            margin:50% auto;
        }
        .pagination {
            padding: 2px 0 0 0;
            text-align: center;
            color: #7086aa;
            &::v-deep .el-pager {
                color: #7086aa;
                font-size: 18px;
                li {
                    margin: 0 4px;
                    border: 1px solid #7086aa;
                    padding: 0;
                    min-width: 36px;
                    height: 36px;
                    line-height: 36px;
                    background-color: transparent;
                    border-radius: 2px;
                    color: #7086aa;
                    i {
                        font-size: 22px;
                        color: #7086aa;
                    }
                }
                li.active {
                    color: #28ffd4;
                    border-color: #28ffd4;
                }
            }
            &::v-deep button {
                margin: 0 4px;
                min-width: 36px;
                height: 36px;
                font-size: 18px;
                border: 1px solid #7086aa;
                padding: 0;
                background-color: transparent;
                border-radius: 2px;
                i {
                    font-size: 22px;
                    color: #7086aa;
                }
            }
        }
        &::v-deep .el-tabs__nav-wrap {
            border: 1px solid #21242E;
        }
        &::v-deep .el-tabs__nav-wrap::after{
            background: transparent;
        }
        &::v-deep .el-tabs__header {
            background: #121723;
            font-size: 16px;
            margin: 0 0 2px;
        }
        &::v-deep [role="tab"] {
            padding: 0 20px !important;
            color: #bacef1;
        }
        &::v-deep [aria-selected="true"] {
            color: #FFFFFF;
        }
        &::v-deep .el-tabs__active-bar {
            background-color: #28ffd4;
        }
        &::v-deep .el-tab-pane {
            height: 860px;
            margin-top: 2px;
            border: 1px solid #21242E;
        }
    }
</style>
