import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router) // 在vue中注入Router

// 解决重复路由问题
const VueRouterReplace = Router.prototype.replace;
const VueRouterPush = Router.prototype.push;
Router.prototype.replace = function replace(to) {
    return VueRouterReplace.call(this, to).catch(err => err);
}
Router.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err);
}

let files = require.context('./../pages').keys();
let routess = [];

files.map(item => {
    item = item.replace('./', '');
    if (item.indexOf(".vue") != -1) {
        item = item.replace(".vue", '');
        let items = item.split("/");
        items.map(children => {
            let route = new Object();
            route.path = '/' + children;
            route.name = children.charAt(0).toUpperCase() + children.slice(1);
            route.component = () =>
                import ('./../pages/' + item + '.vue');
            routess.push(route);
        });
    }
});

// 设置默认路由
let rootRouter = [
    {
        path: '/',
        name: '/home',
        redirect: '/home/match'
    }
]; //根路由
let allRouter = []; //子路由 > 孙子路由
// 取出根路由
files.map(item => {
    item = item.replace('./', '');
    let root = item.split('/');
    if (root.length <= 1 && item.indexOf('.vue') == -1) {
        let URI = root[0];
        let path = '/' + URI;
        let name = '/' + URI;
        let component = () =>
            import ('./../pages/' + URI + '.vue');
        let children = [];

        rootRouter.push({
            path,
            name,
            component,
            children,
            // redirect: path == '/home' ? '/home/match' : undefined // 默认路由
        });
    }
    if (item.indexOf('.vue') == -1) {
        allRouter.push(item);
    }
});



let clearRepeatRouter = new Object();
// 拼接树形路由
function getRootRouter(rootRouter, allRouter) {
    for (let i = 0; i < allRouter.length; i++) {
        let path = rootRouter.path.split("/");
        let all = allRouter[i].split("/");
        let uri = allRouter[i];
        for (let s = 0; s < all.length; s++) {
            if (all[s] == path[path.length - 1] && all[s + 1] && !clearRepeatRouter[uri]) {
                // console.log(uri);
                clearRepeatRouter[uri] = true;
                rootRouter.children.push({
                    path: '/' + uri,
                    name: '/' + uri,
                    component: () =>
                        import ('./../pages/' + uri + '.vue'),
                    children: []
                });
                // 递归
                getRootRouter(rootRouter.children[rootRouter.children.length - 1], allRouter);
                break;
            }
        }
    }
    return rootRouter;
}

rootRouter.map(item => {
    return getRootRouter(item, allRouter);
});

// 将路径注入到Router中
var router = new Router({
        routes: rootRouter
    })
    // 导出路由
export default router;