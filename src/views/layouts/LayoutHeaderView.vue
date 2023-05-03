<template>
    <div class="layout-header pointer">
        <div class="logo" :style="{ width: width + 'px' }">
            <a href="/"><img src="../../assets/logo.png" alt="logo"></a>
        </div>
        <div class="collapse ">
            <i :class="icon" @click="changeCollapse"></i>
        </div>

        <div class="tools">
            <router-link to="/article/create"><i class="el-icon-edit"></i>  博客</router-link>
        </div>
        <div class="user cursor">
            <span class="user-name">{{ user.name }}</span>
            <el-dropdown>
                <span class="el-dropdown-link">
                   <img :src="avatar" fit="fill">
                </span>
                <el-dropdown-menu>
                    <el-dropdown-item @click.n.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </div>
</template>


<script>
import store from "@/store";

export default {
  name: 'LayoutHeaderView',
  props: ['isCollapse'],

  data() {
    return {
      width: 200,
      user: store.state.user
    };
  },

  methods: {
    changeCollapse() {
      this.$emit('changeCollapse')
      // this.width === 200 ? this.width = 64 : this.width = 200
    },
    async logout() {
      await this.$http.auth.logout()
      await this.$store.dispatch('updateToken', '')
      await this.$store.dispatch('updateUser', {})
      this.$message.success('退出成功~')
      await this.$router.push('/login')
    }
  },

  computed: {
    icon() {
      return this.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'
    },
    avatar() {
      let avatar = this.user.avatar
      return avatar ? avatar : 'https://img.zcool.cn/community/031278c58b69c54a801219c77a870e4.jpg@260w_195h_1c_1e_1o_100sh.jpg'
    }
  }
};
</script>


<style lang="less" scoped>
.layout-header {
  display: flex;
  align-items: center;
  height: 100%;

  .logo {
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .collapse {
    width: 40px;
    font-size: 24px;
    color: #303133;
  }

  .tools {
    flex: 1;
    text-align: right;
    padding-right: 20px;

    a {
      color: #333333;
    }
  }

  .user {
    height: 100%;
    display: flex;
    align-items: center;

    .user-name {
      width: 100%;
      color: #333;
    }

    .el-dropdown {
      padding-right: 20px;
    }

    .el-dropdown-link {
      height: 100%;
      line-height: 100%;
    }

    img {
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding-top: 10px;
      object-fit: cover;
      border-radius: 50%;
    }
  }

}
</style>