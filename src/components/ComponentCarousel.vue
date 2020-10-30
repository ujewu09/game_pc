<template>
    <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(item, index) in homeHorse" :key="index">
            <img :src="item.banner_img" />
        </el-carousel-item>
    </el-carousel>
</template>
<script>
export default {
    computed: {
        homeHorse() {
            return this.$store.state.home.homeHorse;
        }
    }
}
</script>
<style lang="less">
    .el-carousel {
        height: 268px;
        .el-carousel__container {
            height: 268px;
        }
        .el-carousel__indicators--outside {
            bottom: 0;
        }
    }
    .el-carousel__item{
        height: 268px;
    }
    .el-carousel__indicators {
        position: absolute;
        transform: translateX(-50%);
        .el-carousel__button {
            width: 50px;
            height: 4px;
        }
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>