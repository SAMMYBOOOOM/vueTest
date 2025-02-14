<template>
  <div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="username" label="Username"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="phone" label="Phone"></el-table-column>
      <el-table-column prop="email" label="Email"></el-table-column>
      <el-table-column prop="address" label="Address"></el-table-column>
      <el-table-column label="Avatar">
        <template v-slot="scope">
          <div style="display: flex; align-items: center">
            <el-image style="width: 50px; height: 50px; border-radius: 50%" v-if="scope.row.avatar"
                      :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]"></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="Role"></el-table-column>
      <el-table-column label="Action">
        <template v-slot="scope">
          <el-button size="mini" type="primary" plain>Edit</el-button>
          <el-button size="mini" type="danger" plain>Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    // To load user data
    load() {
      this.$request.get('user/selectAll').then(res => {
        this.tableData = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>