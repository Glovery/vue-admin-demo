<!-- 页面头部 -->
<template>
  <header class="page-header">
    <div class="header-content">
      <h3 class="logo-title"><i class="el-icon-s-home"></i>后台管理系统</h3>
      <div class="user">
        <span class="username">admin</span>
        <el-dropdown class="drop-menu" placement="bottom">
          <span class="el-icon-user-solid"></span>
          <el-dropdown-menu slot="dropdown">
            <span class="menu-item">
              <i class="el-icon-switch-button"></i>退出
            </span>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.page-header {
  width: 100%;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  border-bottom: 1px solid #e6e6e6;
  .header-content {
    padding: 0 50px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .logo-title {
      font-size: 16px;
      color: #0e8af9;
      cursor: pointer;
    }
    .username {
      margin-right: 10px;
    }
  }
}
.menu-item {
  cursor: pointer;
  display: flex;
  width: 70px;
  padding: 10px 10px;
  justify-content: space-between;
  align-items: center;
}
</style>
