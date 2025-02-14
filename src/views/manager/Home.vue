<template>
  <div>
    <div
        style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 10px 20px; border-radius: 5px; margin-bottom: 10px">
      Welcome {{ user.name }} !
    </div>
    <div style="display: flex">
      <el-card style="width: 30%; margin-right: 10px">
        <div slot="header" class="clearfix">
          <span>vue demo</span>
        </div>
        <div>
          framework
          <div style="margin-top: 20px">
            <div style="margin: 10px 0"><strong>Main theme</strong></div>
            <el-button type="primary">button</el-button>
            <el-button type="success">button</el-button>
            <el-button type="info">button</el-button>
            <el-button type="warning">button</el-button>
          </div>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(localStorage.getItem('honey-user') || '{}'),
    }
  }
}
</script>

<style scoped>

</style>