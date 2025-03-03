<template>
  <div>
    <div>
      <el-input style="width: 200px" placeholder="Search title" v-model="title"></el-input>
      <el-button type="primary" style="margin-left: 10px" @click="load(1)">Search</el-button>
      <el-button type="info" @click="reset">Reset</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-button type="primary" plain @click="handleAdd">Add news</el-button>
      <el-button type="danger" plain @click="delBatch">Batch delete</el-button>
    </div>
    <el-table :data="tableData" stripe :header-cell-style="{background: 'aliceblue', color: '#666'}"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" width="70" align="center"></el-table-column>
      <el-table-column prop="title" label="Title"></el-table-column>
      <el-table-column prop="content" label="Content" show-overflow-tooltip></el-table-column>
      <el-table-column prop="user" label="Author"></el-table-column>
      <el-table-column prop="date" label="Date"></el-table-column>
      <el-table-column label="publish">
        <template v-slot="scope">
          <el-switch v-model="scope.row.publish" @change="changePublish(scope.row)"></el-switch>
        </template>
      </el-table-column>
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
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">

      </el-pagination>
    </div>

    <el-dialog title="Announcement Information" :visible.sync="formVisible" width="40%" :close-on-click-modal="false">
      <el-form :model="form" label-width="80px" style="padding-right: 20px" :rules="rules" ref="formRef">

        <el-form-item label="Title" prop="title">
          <el-input v-model="form.title" placeholder="Title"></el-input>
        </el-form-item>
        <el-form-item label="Content" prop="content">
          <el-input type="textarea" v-model="form.content" placeholder="Content"></el-input>
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
  name: "Announcement",
  data() {
    return {
      tableData: [],  // All news data
      pageNum: 1, // The current page
      pageSize: 5,  // Every page shows 5 pieces of data
      username: '',
      title: '',
      total: 0,
      formVisible: false,
      form: {},
      user: JSON.parse(localStorage.getItem("honey-user") || '{}'),
      rules: {
        title: [{required: true, message: 'Please input title', trigger: 'blur'},],
        content: [{required: true, message: 'Please input content', trigger: 'blur'},],
      },
      ids: [],
    }
  },
  created() {
    this.load()
  },
  methods: {
    changePublish(form) {
      //  Need to use api to do the update, to update the publish field back to the database
      // Can't use save directly, without form
      this.form = JSON.parse(JSON.stringify(form)) // Deep copy
      this.sendSaveRequest()
    },
    delBatch() {
      if (!this.ids.length) {
        this.$message.warning("Please select data")
        return
      }
      this.$confirm("Are you sure to batch delete these items?", "Confirm deletion", {type: 'warning'}).then(response => {
        this.$request.delete('/announcement/delete/batch', {data: this.ids}).then(res => {
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
        this.$request.delete('/announcement/delete/' + id).then(res => {
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
      this.form = {}  // Reset form data
      this.formVisible = true
    },
    save() {  // Logic of save button method
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.sendSaveRequest()
        }
      })
    },
    sendSaveRequest() {
      this.$request({
        url: this.form.id ? '/announcement/update' : '/announcement/add',
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
    },
    reset() {
      this.title = ''
      this.load()
    },
    // To load news data
    load(pageNum) {
      if (pageNum) this.pageNum = pageNum
      this.$request.get('announcement/selectByPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.title,
        }
      }).then(res => {
        if (res.data) {
          this.tableData = res.data.records || [];
          this.total = res.data.total || 0;
        } else {
          this.tableData = [];
          this.total = 0;
        }
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    handleCurrentChange(pageNum) {
      this.load(pageNum)
    },
  }
}
</script>

<style>
.el-tooltip__popper {
  max-width: 200px !important;
}
</style>