<template>
    <div class="component-user-head">
        <div class="user">
            <div class="info">
                <div class="head">
                    <img :src="avatar" />
                </div>
                <slot name="sex"></slot>
                <div class="name">
                    <h3>{{nickName}}</h3>
                    <div class="float">
                        <slot name="float"></slot>
                    </div>
                </div>
            </div>
            <div class="right">
                <slot name="right"></slot>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    props: {
        userID: {
            required: true
        },
        avatar: {
            type: String,
            required: true
        },
        nickName: {
            type: String,
            required: true
        }
    },
    mounted() {
        
    }
}
</script>
<style lang="less" scoped>
.component-user-head{
    padding:15px 15px 0 15px !important;
    .user {
        display: flex;
        padding: 0 0 15px 0;
        .info {
            position: relative;
            flex: 1;
            display: flex;
            align-items: center;
            .head {
                width: 45px;
                height: 45px;
                line-height: 45px;
                border-radius: 50%;
                overflow: hidden;
                img {
                    width: 100%;
                }
            }
            .name {
                position: relative;
                width: 80px;
                margin: 0 0 0 10px;
                color: #FFFFFF;
                font-size: 16px;
                h3 {
                    font-size: 15px;
                    margin: 0;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                p {
                    margin: 0;
                    color: #526583;
                    font-size: 12px;
                }
                .float {
                    position: absolute;
                    top: 0;
                    right: 0;
                    transform: translate(100%);
                }
            }
        }
        .right {
            display: flex;
            align-items: center;
        }
    }
}
</style>
