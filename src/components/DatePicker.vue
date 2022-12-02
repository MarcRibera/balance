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
  right: 2%;
  z-index: 99;
  display: flex;
  height: 50px;
  width: 200px;
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
  ::v-deep input.el-input__inner {
    height: 35px;
  }

  .el-select {
    width: 100px;
  }
}
</style>
