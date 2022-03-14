<template>
  <div>
    <el-table show-summary :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="Date" width="180"> </el-table-column>
      <el-table-column prop="category" label="Category" width="180">
      </el-table-column>
      <el-table-column prop="amount" label="Amount" width="180">
      </el-table-column>
      <el-table-column prop="description" label="Description">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    currentYear: {
      type: Number,
      default: 2022,
    },
    currentMonth: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dataReceived: [],
      dataToShow: [],
    }
  },
  watch: {
    data() {
      this.dataReceived = this.data
    },
  },
  computed: {
    tableData() {
      return this.dataReceived.length > 0
        ? this.dataReceived[this.currentYear][this.currentMonth].entries
        : []
    },
  },
  methods: {
    getMonth(month) {
      this.currentMonth = month
    },
  },
}
</script>

<style></style>
