<template>
  <div class="login-page">
    <div class="login-wrap">
      <h3 class="login-title">账号登录</h3>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-position="left"
        label-width="70px"
        class="login-form"
      >
        <el-row class="row">
          <el-col>
            <el-form-item label="用户名：" prop="username">
              <el-input
                v-model="loginForm.username"
                prefix-icon="el-icon-user"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col>
            <el-form-item label="密码：" prop="password">
              <el-input
                v-model="loginForm.password"
                prefix-icon="el-icon-unlock"
                placeholder="请输入密码"
                type="password"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col>
            <el-button
              @click="login"
              class="login-button"
              v-loading="loginForm.loading"
              >登录</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error("密码不能为空"));
      } else if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        loading: false
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          // let paramData = {
          //   username: this.loginForm.username,
          //   password: this.loginForm.password
          // };
          // this.$http
          //   .login(paramData)
          //   .then(res => {
          //     if (res.code === 0) {
          //       console.log(res.data);
          //     } else {
          //       this.$message.error(res.msg);
          //     }
          //   })
          //   .finally(() => {
          //     this.loginForm.loading = false;
          //   });
          this.$router.push({ name: "index" });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  background-color: #2d3a4b;
  position: relative;
  .login-wrap {
    width: 380px;
    height: 380px;
    padding: 20px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-title {
      text-align: center;
      margin-bottom: 20px;
    }
    .row {
      margin-top: 30px;
    }
    .login-button {
      width: 100%;
      height: 50px;
      font-size: 16px;
    }
  }
}
</style>
