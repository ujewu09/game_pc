<template>
    <div class="user-my-personal">
        <div class="personal">
            <span>默认下单数量：</span>
            <input  v-model="value" />
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            value:3000,
        }
    }
}
</script>
<style  lang='less' scoped>
 @import url('../../../assets/style.less');
.user-my-personal{
    padding:80px 60px 0 60px;
    .personal{
        font-size:16px;
        color:@color-tip;
    }
    input{
        background:none;
        border:none;
        outline: none;
        border-bottom: 1px solid @color-tip;
        color:@color-used;
        font-size: 16px;
        padding-left: 50px;
        width:100px;
    }
}
</style>