<template>
  <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background-color: cadetblue;">
    <div style="display: flex; background-color: white; width: 50%; border-radius: 5px; overflow: hidden">
      <div style="flex: 1">
        <img src="@/assets/login.png" alt="" style="width: 100%">
      </div>
      <div style="flex: 1; display: flex; align-items: center; justify-content: center">
        <el-form :model="user" style="width: 80%" :rules="rules" ref="loginRef">
          <div style="font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 20px">Welcome back</div>
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" size="medium" placeholder="Username"
                      v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="Password"
                      v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div style="display: flex">
              <el-input prefix-icon="el-icon-circle-check" size="medium" style="flex: 1" placeholder="Code"
                        v-model="user.code"></el-input>
              <div style="flex: 1; height: 36px">
                <ValidCode @input="getCode" :length="1"/>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="login">Login</el-button>
          </el-form-item>
          <div style="display: flex">
            <div style="flex: 1">Don't have an account? <span style="color: #0f9876; cursor: pointer"
                                                              @click="$router.push('/register')">Register</span>
            </div>
            <div style="flex: 1; text-align: right"><span style="color: #0f9876; cursor: pointer" @click="handleForgotPass">Forgot password</span>
            </div>
          </div>
        </el-form>
      </div>

    </div>

    <el-dialog :visible.sync="forgotPassDialogVis" title="Forgot password" width="30%">
      <el-form :model="forgotUserForm" label-width="80px" style="padding-right: 20px">
        <el-form-item label="Username">
          <el-input v-model="forgotUserForm.username" autocomplete="off" placeholder="Please enter your username"></el-input>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="forgotUserForm.phone" placeholder="Please enter your phone"></el-input>
        </el-form-item>
      </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="forgotPassDialogVis = false">Cancel</el-button>
          <el-button type="primary" @click="resetPassword">Confirm</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import ValidCode from "@/components/ValidCode.vue";

export default {
  name: "Login",
  components: {
    ValidCode
  },
  data() {

    // Validate code
    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Enter validation code'));
      } else if (value.toLowerCase() !== this.code) {
        callback(new Error('Wrong validation code'))
      } else {
        callback()
      }
    };

    return {
      forgotUserForm: {

      },
      forgotPassDialogVis: false,
      code: '', // Validation code from component
      user: {
        code: '', // From form (user input)
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: 'Enter username', trigger: 'blur'},
        ],
        password: [
          {required: true, message: 'Enter password', trigger: 'blur'},
        ],
        code: [
          {validator: validateCode, trigger: 'blur'}
        ]
      },
    }
  },
  created() {

  },
  methods: {
    handleForgotPass() {  // Initialize forgot password dialog
      this.forgotUserForm = {}
      this.forgotPassDialogVis = true
    },
    resetPassword() {
      this.$request.put('/password', this.forgotUserForm).then(res => {
        if(res.code === '200') {
          this.$message.success('Reset password successfully!')
        }else{
          this.$message.error(res.message)
        }
      })
      this.forgotPassDialogVis = false
    },
    getCode(code) {
      console.log(code)
      this.code = code.toLowerCase()
    },
    login() {
      this.$refs['loginRef'].validate((valid) => {
        if (valid) {
          this.$request.post('/login', this.user).then(res => {
            if (res.code === '200') {
              this.$router.push('/')
              this.$message.success('Login successful')
              localStorage.setItem("honey-user", JSON.stringify(res.data))  // Store user info
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })


    }
  }
}
</script>

<style scoped>

</style>