<template>
  <div>
    <div>
      <el-input style="width: 200px" placeholder="Search username" v-model="username"></el-input>
      <el-input style="width: 200px; margin: 0 5px" placeholder="Search name" v-model="name"></el-input>
      <el-button type="primary" @click="load(1)">Search</el-button>
      <el-button type="info" @click="reset">Reset</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-button type="primary" plain @click="handleAdd">Add user</el-button>
      <el-button type="danger" plain @click="delBatch">Batch delete</el-button>
    </div>
    <el-table :data="tableData" stripe :header-cell-style="{background: 'aliceblue', color: '#666'}"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" width="70" align="center"></el-table-column>
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
      <el-table-column label="Action" align="center" width="180">
        <template v-slot="scope">
          <el-button size="mini" type="primary" plain @click="handleEdit(scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" plain @click="del(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 10px 0">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">

      </el-pagination>
    </div>

    <el-dialog title="" :visible.sync="formVisible" width="30%">
      <el-form :model="form" label-width="80px" style="padding-right: 20px" :rules="rules" ref="formRef">

        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item label="name" prop="name">
          <el-input v-model="form.name" placeholder="Name"></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="form.phone" placeholder="Phone"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input type="textarea" v-model="form.address" placeholder="Address"></el-input>
        </el-form-item>
        <el-form-item label="Role" prop="role">
          <el-radio-group v-model="form.role">
            <el-radio label="user"></el-radio>
            <el-radio label="admin"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Avatar">
          <el-upload
              accept=".png"
              class="avatar-uploader"
              action="http://localhost:9090/file/upload"
              :headers="{token: user.token }"
              :file-list="form.avatar ? [form.avatar] : []"
              list-type="picture"
              :on-success="handleAvatarSuccess"
          >
            <el-button type="primary">Upload Avatar</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save">Confirm</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      tableData: [],  // All user data
      pageNum: 1, // The current page
      pageSize: 5,  // Every page shows 5 pieces of data
      username: '',
      name: '',
      total: 0,
      formVisible: false,
      form: {},
      user: JSON.parse(localStorage.getItem("honey-user") || '{}'),
      rules: {
        username: {required: true, message: 'Please input username', trigger: 'blur'},
      },
      ids: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    delBatch() {
      if(!this.ids.length) {
        this.$message.warning("Please select data")
        return
      }
      this.$confirm("Are you sure to batch delete these items?", "Confirm deletion", {type: 'warning'}).then(response => {
        this.$request.delete('/user/delete/batch', {data: this.ids}).then(res => {
          if (res.code === '200') {
            this.$message.success("Batch delete successfully")
            this.load(1)
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
      })
    },
    handleSelectionChange(rows) { // Current selected rows data
      this.ids = rows.map(v => v.id)
    },
    del(id) {
      this.$confirm("Are you sure to delete this item?", "Confirm deletion", {type: 'warning'}).then(response => {
        this.$request.delete('/user/delete/' + id).then(res => {
          if (res.code === '200') {
            this.$message.success("Delete successfully")
            this.load(1)
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
      })
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row)) // Deep copy
      this.formVisible = true
    },
    handleAdd() {
      this.form = {role: 'user'}  // Reset form data
      this.formVisible = true
    },
    save() {  // Logic of save button method
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$request({
            url: this.form.id ? '/user/update' : '/user/add',
            method: this.form.id ? 'PUT' : 'POST',
            data: this.form
          }).then(res => {
            if (res.code === '200') {
              this.$message.success('Save successfully')  // success
              this.load(1)
              this.formVisible = false
            } else {
              this.$message.error(res.message)  // fail
            }
          })
        }
      })
    },
    reset() {
      this.name = ''
      this.username = ''
      this.load()
    },
    // To load user data
    load(pageNum) {
      if (pageNum) this.pageNum = pageNum
      this.$request.get('user/selectByPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          username: this.username,
          name: this.name,
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    handleCurrentChange(pageNum) {
      this.load(pageNum)
    },
    handleAvatarSuccess(response, file, fileList) {
      // Change user avatar to the uploaded avatar
      this.form.avatar = response.data
    }
  }
}
</script>

<style scoped>

</style>