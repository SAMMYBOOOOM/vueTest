<template>
  <div>
    <el-card style="width: 50%">
      <el-form :model="user" label-width="80px" style="padding-right: 20px">
        <div style="margin: 15px; text-align: center">
          <el-upload
              accept=".png"
              class="avatar-uploader"
              action="http://localhost:9090/file/upload"
              :headers="{token: user.token }"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
          >
            <img v-if="user.avatar" :src="user.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-form-item label="Username" prop="username">
          <el-input v-model="user.username" placeholder="Username" disabled></el-input>
        </el-form-item>
        <el-form-item label="name" prop="name">
          <el-input v-model="user.name" placeholder="Name"></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="user.phone" placeholder="Phone"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="user.email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input type="textarea" v-model="user.address" placeholder="Address"></el-input>
        </el-form-item>
        <div style="text-align: center; margin-bottom: 20px">
          <el-button type="primary" @click="update">Save</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Person",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("honey-user") || '{}')
    }
  },
  created() {
  },
  methods: {
    update() {
      // Save current user information back to the database
      this.$request.put('/user/update', this.user).then(res => {
        if (res.code === '200') {
          this.$message.success('Save successfully');
          // Refresh user browser cache
          localStorage.setItem("honey-user", JSON.stringify(this.user))
          // Send back to parent page
          this.$emit('update:user', this.user)
        } else {
          this.$message.error(res.message);
        }
      })

    },
    handleAvatarSuccess(response, file, fileList) {
      // Change user avatar to the uploaded avatar
      this.user.avatar = response.data
    }

  }
}
</script>

<style scoped>
/deep/ .el-form-item__label {
  font-weight: bold;
}

/deep/ .el-upload {
  border-radius: 50%;
}

/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border-radius: 50%;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 50%;
}
</style>