<template>
  <div>
    <el-container>
      <!--      left manu-->
      <el-aside :width="asideWidth" style="min-height: 100vh; background-color:#001529;">
        <div
            style="height: 60px; line-height: 60px; color: white;display: flex; align-items: center; justify-content: center">
          logo
        </div>

        <el-menu :collapse="isCollapse" :collapse-transition="false" router background-color="#001529"
                 text-color="rgba(255, 255, 255, 0.65)"
                 active-text-color="#fff"
                 style="border: none" :default-active="$route.path">
          <el-menu-item index="/home">
            <template>
              <i class="el-icon-s-house"></i>
              <span slot="title">System Home page</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/person">Personal info</el-menu-item>
          <el-menu-item index="/element">Element</el-menu-item>
          <el-submenu index="info" v-if="user.role === 'admin'">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>Info management</span>
            </template>
            <el-menu-item index="/user">User information</el-menu-item>
            <el-menu-item index="/manager">Manager information</el-menu-item>
            <el-menu-item index="/staff">Staff information</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!--      header-->
        <el-header>
          <i :class="collapseIcon" style="font-size: 26px" @click="handleCollapse"></i>
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 20px">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: $route.path }">{{ $route.meta.name }}</el-breadcrumb-item>
          </el-breadcrumb>

          <div style="flex: 1; width: 0; display: flex; align-items: center; justify-content: flex-end">
            <el-dropdown>
              <div style="display: flex; align-items: center">
                <img :src="user.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" alt="" style="width: 40px; height: 40px; border-radius: 50%; margin: 0 5px">
                <span>{{ user.name }}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="$router.push('/person')">Personal information</el-dropdown-item>
                <el-dropdown-item @click.native="$router.push('/password')">Change password</el-dropdown-item>
                <el-dropdown-item @click.native="logout">Exit</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <!--        main-->
        <el-main>
          <!--    To take user information from child page      -->
          <router-view @update:user="updateUser"/>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      isCollapse: false,
      asideWidth: '200px',
      collapseIcon: 'el-icon-s-fold',
      user: JSON.parse(localStorage.getItem('honey-user') || '{}'),  // To fetch user token
    }
  },
  mounted() {
  },
  methods: {
    updateUser(user) {
      this.user = JSON.parse(JSON.stringify(user))  // Make the parent object doesn't change with the child object
    },
    logout() {
      localStorage.removeItem('honey-user') // Clear user token
      this.$router.push('/login')
    },
    handleCollapse() {
      this.isCollapse = !this.isCollapse
      this.asideWidth = this.isCollapse ? '64px' : '200px'
      this.collapseIcon = this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    }
  }
}
</script>

<style>
.el-menu--inline {
  background-color: #000c17 !important;
}

.el-menu--inline .el-menu-item {
  background-color: #000c17 !important;
  padding-left: 49px !important;
}

.el-menu-item:hover, .el-submenu__title:hover {
  color: #fff !important;
}

.el-submenu__title:hover i {
  color: #fff !important;
}

.el-menu-item.is-active {
  background-color: #1890ff !important;
  border-radius: 5px !important;
  margin: 4px !important;
}

.el-menu-item {
  margin: 4px !important;
  height: 40px !important;
  line-height: 40px !important;
}

.el-submenu__title {
  margin: 4px !important;
  height: 40px !important;
  line-height: 40px !important;
}

.el-submenu__icon-arrow {
  margin-top: -5px;
}

.el-header {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  display: flex;
  align-items: center;
}
</style>