<template>
  <div class="ValidCode disabled-select" style="width: 100%; height: 100%;" @click="refreshCode">
    <span v-for="(item, index) in codeList" :key="index" :style="getStyle(item)">{{ item.code }}</span>
  </div>
</template>

<script>
export default {
  name: "ValidCode",
  props: {
    value: {
      type: String,
      default: ''
    },
    length: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      codeList: [],
      fontSize: '25px' // Added missing fontSize property
    }
  },
  mounted() {
    this.createCode()
  },
  methods: {
    refreshCode() {
      this.createCode()
    },
    createCode() {
      const codeList = []
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charLen = chars.length

      for(let i = 0; i < this.length; i++) {
        const rgb = [
          Math.round(Math.random() * 220),
          Math.round(Math.random() * 240),
          Math.round(Math.random() * 200)
        ]
        codeList.push({
          code: chars.charAt(Math.floor(Math.random() * charLen)),
          color: `rgb(${rgb.join(',')})`,
          fontSize: this.fontSize,
          padding: `${Math.floor(Math.random() * 10)}px`,
          transform: `rotate(${Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)}deg)`
        })
      }

      this.codeList = codeList
      this.$emit('input', codeList.map(item => item.code).join(''))
    },
    getStyle(data) {
      return {
        color: data.color,
        fontSize: data.fontSize,
        padding: data.padding,
        transform: data.transform
      }
    }
  }
}
</script>

<style scoped>
.ValidCode {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.ValidCode span {
  display: inline-block;
}

.disabled-select {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>