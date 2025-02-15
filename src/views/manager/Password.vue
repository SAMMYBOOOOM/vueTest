<template>
  <div>
    <el-card style="width: 50%">
      <el-form :rules="rules" ref="formRef" :model="user" label-width="80px" style="padding-right: 20px">
        <el-form-item label="Current password" prop="password">
          <el-input show-password v-model="user.password" placeholder="Current password"></el-input>
        </el-form-item>
        <el-form-item label="New password" prop="newPassword">
          <el-input show-password v-model="user.newPassword" placeholder="New password"></el-input>
        </el-form-item>
        <el-form-item label="Confirm password" prop="confirmPassword">
          <el-input show-password v-model="user.confirmPassword" placeholder="Confirm password"></el-input>
        </el-form-item>
        <div style="text-align: center; margin-bottom: 20px">
          <el-button type="primary" @click="update">Confirm</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Password",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please confirm your password'));
      } else if (value !== this.user.newPassword) {
        callback(new Error('Two inputs don\'t match!'));
      } else {
        callback();
      }
    }

    return {
      user: JSON.parse(localStorage.getItem("honey-user") || '{}'),
      rules: {
        password: [
          {required: true, message: 'Please input password', trigger: 'blur'},
        ],
        newPassword: [
          {required: true, message: 'Please input new password', trigger: 'blur'},
        ],
        confirmPassword: [
          {validator: validatePass, required: true, trigger: 'blur'},
        ],
      },
    };
  },
  created() {
  },
  methods: {
    update() {
      this.$refs.formRef.validate(valid => {
        if(valid){
          // Update password
          this.user.password = this.user.newPassword
          // Save current user information back to the database
          this.$request.put('/user/update', this.user).then(res => {
            if (res.code === '200') {
              this.$message.success('Update successfully');
              localStorage.removeItem('honey-user') // Clear user token
              this.$router.push('/login')
            } else {
              this.$message.error(res.message);
            }
          })
        }
      })
    },
  }
};
</script>

<style scoped>
/deep/ .el-form-item__label {
  font-weight: bold;
}

</style>