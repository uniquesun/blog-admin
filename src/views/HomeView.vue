<template>
    <div class="home">
        hello world
        <el-button type="primary" @click="logout">退出</el-button>
    </div>
</template>

<script>
import ls from "@/utils/localStorage";

export default {
  name: 'HomeView',
  methods: {
    logout() {
      ls.setItem('token', null)
      this.$router.push('/login')
    }
  }
}
</script>
