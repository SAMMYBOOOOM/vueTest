<template>
  <div>
    <div>
      <el-input style="width: 200px" placeholder="Search username" v-model="title"></el-input>
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
      <el-table-column prop="description" label="Description"></el-table-column>
      <el-table-column prop="content" label="Content">
        <template v-slot="scope">
          <el-button type="text" @click="showContent(scope.row.content)" size="mini">Show</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="detail" label="Detail">
        <template v-slot="scope">
          <el-button @click="$router.push('/newsDetail?id=' + scope.row.id)" size="mini">Detail</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="Author"></el-table-column>
      <el-table-column prop="date" label="Date"></el-table-column>
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

    <el-dialog title="News Information" :visible.sync="formVisible" width="60%" @close="closeDialog" :close-on-click-modal="false">
      <el-form :model="form" label-width="80px" style="padding-right: 20px" :rules="rules" ref="formRef">

        <el-form-item label="Title" prop="title">
          <el-input v-model="form.title" placeholder="Title"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="form.description" placeholder="Description"></el-input>
        </el-form-item>
        <el-form-item label="Content" prop="content">
          <div id="editor"></div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save">Confirm</el-button>
      </div>
    </el-dialog>

    <el-dialog title="News Content" :visible.sync="formVisible1" width="60%">
      <el-card class="w-e-text">
        <div v-html="content"></div>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="formVisible1 = false">Close</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import E from 'wangeditor'

export default {
  name: "News",
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
        title: {required: true, message: 'Please input title', trigger: 'blur'},
      },
      ids: [],
      editor: null,
      formVisible1: false,
    }
  },
  created() {
    this.load()
  },
  methods: {
    showContent(content) {
      this.content = content
      this.formVisible1 = true
    },
    closeDialog() {
      this.editor.destroy()
      this.editor = null
    },
    delBatch() {
      if (!this.ids.length) {
        this.$message.warning("Please select data")
        return
      }
      this.$confirm("Are you sure to batch delete these items?", "Confirm deletion", {type: 'warning'}).then(response => {
        this.$request.delete('/news/delete/batch', {data: this.ids}).then(res => {
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
        this.$request.delete('/news/delete/' + id).then(res => {
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
    setRichText(){
      this.$nextTick(() => {
        this.editor = new E(`#editor`)
        this.editor.config.uploadImgServer = this.$baseUrl + '/file/editor/upload'
        this.editor.config.uploadFileName = 'file'
        this.editor.config.uploadImgHeaders = { // To send token back to backend to verify
          token: this.user.token
        }
        this.editor.config.uploadImgParams = {
          type: 'img'
        }
        this.editor.config.uploadVideoServer = this.$baseUrl + '/file/editor/upload'  // For uploading video
        this.editor.config.uploadVideoName = 'file'
        this.editor.config.uploadVideoHeaders = {
          token: this.user.token
        }
        this.editor.config.uploadVideoParams = {
          type: 'video'
        }
        this.editor.create()
      })
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row)) // Deep copy
      this.formVisible = true

      this.setRichText()
      setTimeout(() => {
        this.editor.txt.html(row.content) // Setting the editor content
      }, 0)
    },
    handleAdd() {
      this.form = {}  // Reset form data
      this.formVisible = true

      this.setRichText()
    },
    save() {  // Logic of save button method
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // Retrieve the content of the editor
          this.form.content = this.editor.txt.html()
          this.$request({
            url: this.form.id ? '/news/update' : '/news/add',
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
      this.title = ''
      this.load()
    },
    // To load news data
    load(pageNum) {
      if (pageNum) this.pageNum = pageNum
      this.$request.get('news/selectByPage', {
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

<style scoped>

</style>