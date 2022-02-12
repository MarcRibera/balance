<template>
  <div>
    <DateSelector :type="'month'" @select="getMonth" />
    <DateSelector :type="'year'" @select="getYear" />
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
import DateSelector from '@/components/DateSelector.vue'

export default {
  components: {
    DateSelector,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dataReceived: [],
      dataToShow: [],
      currentMonth: 0,
      currentYear: null,
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
    getYear(year) {
      this.currentYear = year
    },
  },
}
</script>

<style></style>
