<template>
    <div class="layout-aside">
        <el-menu router text-color="#333" collapse-transition active-text-color="#4c60a3"
                 :default-active="this.$route.path"
                 class="el-menu-vertical-demo" :collapse="isCollapse">
            <el-menu-item v-for="(nav, key) in navs" :key="key" :index="nav.url">
                <i :class="nav.icon"></i>
                <span slot="title">{{ nav.title }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>


<script>
export default {
  name: 'LayoutAsideView',

  props: ['isCollapse'],
  data() {
    return {
      navs: [
        {
          title: '首页',
          icon: 'el-icon-s-home',
          url: '/'
        },
        {
          title: '分类',
          icon: 'el-icon-menu',
          url: '/category'
        },
        {
          title: '博客',
          icon: 'el-icon-document',
          url: '/article'
        },
        {
          title: '评论',
          icon: 'el-icon-s-comment',
          url: '/comment'
        },
        // {
        //   title: '我的',
        //   icon: 'el-icon-user-solid',
        //   url: '/user'
        // }
      ]
    };
  },
};
</script>


<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.is-active {
  background-color: #ffffff !important;
}

.el-menu li {
  height: 42px;
  line-height: 42px;
}

.logout{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

</style>