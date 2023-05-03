<template>
    <div class="home">
        <el-container>
            <el-header>
                <LayoutHeaderView :is-collapse="isCollapse" @changeCollapse="changeCollapse"></LayoutHeaderView>
            </el-header>
            <el-container>
                <el-aside style="width: auto;">
                    <LayoutAsideView :is-collapse="isCollapse"></LayoutAsideView>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                    <el-footer>
                        <LayoutFooterView></LayoutFooterView>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>


<script>
import LayoutFooterView from './LayoutFooterView.vue';
import LayoutAsideView from './LayoutAsideView.vue';
import LayoutHeaderView from './LayoutHeaderView.vue';
import store from "@/store";

export default {
  name: 'IndexView',

  components: {
    LayoutFooterView,
    LayoutAsideView,
    LayoutHeaderView
  },

  data() {
    return {
      isCollapse: store.state.isCollapse,
    };
  },

  mounted() {

  },

  methods: {
    changeCollapse() {
      store.dispatch('updateMenuCollapse', !this.isCollapse)
      this.isCollapse = !this.isCollapse
    }
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .el-header {
    height: 60px;
    background-color: var(--bs-white);
    text-align: center;
    line-height: 60px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
    padding: 0;
  }

  .el-container {
    height: 100%;

    .el-aside {
      background-color: var(--bs-white);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05) !important;
    }

    .el-main {
      background-color: var(--content-bg-primary);
    }

    .el-footer {
      height: 40px !important;
      line-height: 40px;
      text-align: center;
      font-size: 10px;
      background-color: var(--content-bg-primary);
      color: var(--bs-gay);
    }

  }

}
</style>