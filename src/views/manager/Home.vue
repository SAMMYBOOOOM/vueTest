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

    <div style="display: flex; margin: 15px 0">
      <el-card style="width: 50%; margin-right: 10px">
        <div style="margin-bottom: 15px"><strong>System Announcement</strong></div>
        <el-timeline style="padding: 0">
          <el-timeline-item v-for="item in announcements" :key="item.id" :timestamp="item.date" placement="top">
            <el-card>
              <h4>{{ item.title }}</h4>
              <p>{{ item.content }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>

      <el-card style="width: 50%">
        <div style="margin-bottom: 15px; font-size: 20px; font-weight: bold">System Announcement</div>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item v-for="(item, index) in announcements" :key="item.id" :name="index + ''">
            <template slot="title">
              <h4>{{ item.title }}</h4>
            </template>
            <div>{{ item.content }}</div>
          </el-collapse-item>
        </el-collapse>
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
      announcements: [],
    }
  },
  created() {
    this.loadAnnouncement()
  },
  methods: {
    loadAnnouncement() {
      this.$request.get('/announcement/selectUserAnnouncement').then(res => {
        this.announcements = res.data
      })
    }
  },
}
</script>

<style scoped>

</style>