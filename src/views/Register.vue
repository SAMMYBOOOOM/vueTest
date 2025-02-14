<template>
  <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-color: dodgerblue;">
    <div style="display: flex; background-color: white; width: 50%; border-radius: 5px; overflow: hidden">
      <div style="flex: 1">
        <img src="@/assets/register.png" alt="" style="width: 100%">
      </div>
      <div style="flex: 1; display: flex; align-items: center; justify-content: center">
        <el-form :model="user" style="width: 80%" :rules="rules" ref="registerRef">
          <div style="font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 20px">Register a new account</div>
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" size="medium" placeholder="Username"
                      v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="Password"
                      v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPass">
            <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="Confirm password"
                      v-model="user.confirmPass"></el-input>
          </el-form-item>
          <el-form-item prop="role">
            <el-radio-group v-model="user.role">
              <el-radio label="user"></el-radio>
              <el-radio label="owner"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="info" style="width: 100%" @click="register">Register</el-button>
          </el-form-item>
          <div style="display: flex">
            <div style="flex: 1">Already have an account? <span style="color: #0f9876; cursor: pointer" @click="$router.push('/login')">Login</span>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please confirm your password'));
      } else if (value !== this.user.password) {
        callback(new Error('Passwords do not match'));
      } else {
        callback();
      }
    };

    return {
      user: {
        username: '',
        password: '',
        confirmPass: ''
      },
      rules: {
        username: [
          { required: true, message: 'Please enter a username', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Please enter a password', trigger: 'blur' },
        ],
        confirmPass: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        role: [
          { required: true, message: 'Please select a role', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    register() {
      this.$refs['registerRef'].validate((valid) => {
        if (valid) {
          this.$request.post('/register', this.user).then(res => {
            if (res.code === '200') {
              this.$router.push('/login');
              this.$message.success('Registration successful');
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>