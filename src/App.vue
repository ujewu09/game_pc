<template>
    <div id="app">
        <component-top ></component-top>
        <component-nav></component-nav>
        <div class="router-view">
             <router-view />
        </div>
        <component-footer></component-footer>
    </div>
</template>
<script>
import ComponentTop from './components/ComponentTop';
import ComponentNav from './components/ComponentNav';
import ComponentFooter from './components/ComponentFooter';
export default {
    name: 'App',
    data(){
        return{
            path:'',
        }
    },
    components: {
        ComponentTop,
        ComponentNav,
        ComponentFooter
    },
    // mounted(){
    //     this.path = this.$route.path 
    // },
    // watch:{
    //     $route(to,from){ 
    //         this.path = to.path 
    // eslint-disable-line no-unused-vars
    //     }
    // }
}
</script>
<style lang="less">
body, html {
    margin: 0;
    padding: 0;
}
body { 
    background: url(./assets/common/bg.png);
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    // .router-np {
        // max-width: 1246px;
        // width: 1246px;
        // margin: 0 auto;
    // }
}
</style>
