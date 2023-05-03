<template>
    <div class="login">
        <div class="form">
            <h3>博客后台</h3>
            <el-form ref="form" :rules="rules" :model="form">
                <el-form-item prop="name">
                    <el-input prefix-icon="el-icon-user-solid" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" prefix-icon="el-icon-milk-tea" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: '',
        password: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, message: '长度最小2个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const response = await this.$http.auth.login(this.form)
          if (!response.status) {
            return this.$message.error(response.message)
          }
          await this.$store.dispatch('updateToken', response.data.access_token)
          const user = await this.$http.user.me()
          await this.$store.dispatch('updateUser', user.data)
          this.$message.success('登录成功')
          await this.$router.push({name: 'home'})
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-color: var(--bg-primary);
  height: 100%;
}

.form {
  width: 450px;
  height: 300px;
  background-color: var(--bs-white);
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;

  h3 {
    text-align: center;
    padding-bottom: 30px;
  }

  .btn {
    text-align: right;
  }
}
</style>