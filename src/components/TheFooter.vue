<template>
  <div>
    <a href="https://marcribera.net" target="_blank">Marc Ribera</a>
    {{ currentYearFooter }}
  </div>
</template>
<script>
export default {
  computed: {
    currentYearFooter() {
      return this.today.getFullYear()
    },
  },
  data() {
    return {
      today: new Date(),
    }
  },
}
</script>

<style lang="scss">
.el-footer {
  display: flex;
  justify-content: center;
  font-size: 14px;
  a {
    text-decoration: none;
    margin-right: 8px;
  }
}
</style>
