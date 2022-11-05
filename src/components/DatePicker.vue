<template>
  <div class="date-picker">
    <p>Year</p>
    <DateSelector :type="'year'" @select="handleSelectedYear" />
    <p>Month</p>
    <DateSelector :type="'month'" @select="handleSelectedMonth" />
  </div>
</template>
<script>
import DateSelector from './DateSelector.vue'

export default {
  components: {
    DateSelector,
  },
  methods: {
    handleSelectedYear(value) {
      this.$emit('select-year', value)
    },
    handleSelectedMonth(value) {
      this.$emit('select-month', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.date-picker {
  position: fixed;
  z-index: 99;
  display: flex;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 388px;
  background: lightsteelblue;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 8px;
  margin-top: 6px;
  p {
    margin-left: 16px;
  }

  .el-select {
    width: 100px;
  }
}
</style>
