<template>
  <div>
    <el-collapse class="collapse">
      <el-card>
        <el-collapse-item title="Monthly Movements">
          <el-table
            show-summary
            :data="tableData"
            stripe
            style="width: 100%"
            height="650"
          >
            <el-table-column prop="date" label="Date" width="180">
            </el-table-column>
            <el-table-column prop="category" label="Category" width="180">
            </el-table-column>
            <el-table-column prop="amount" label="Amount" width="180">
            </el-table-column>
            <el-table-column prop="description" label="Description">
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-card>
    </el-collapse>
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

<style lang="scss" scoped>
.collapse .el-card {
  margin-bottom: 30px;
  ::v-deep .el-card__body {
    padding: 10px 16px;
  }
}
</style>
