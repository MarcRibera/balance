<template>
  <el-date-picker
    v-model="dateRange"
    type="daterange"
    align="right"
    unlink-panels
    format="dd/MM/yyyy"
    :clearable="false"
    :editable="false"
    range-separator="To"
    start-placeholder="Start date"
    end-placeholder="End date"
    :picker-options="pickerOptions"
  >
  </el-date-picker>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        firstDayOfWeek: 1,
        disabledDate(date) {
          // TODO: disable dates of documents out of project
          return date > Date.now();
        },
        shortcuts: [
          {
            text: "Last week",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Last month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Last 3 months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      dateRange: [],
    };
  },
  mounted() {
    this.setInitalDates();
  },
  watch: {
    dateRange() {
      this.$emit("getCurrentDates", this.dateRange);
    },
  },
  methods: {
    setInitalDates() {
      let start, end;
      end = new Date();
      start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      this.dateRange = [start, end];
    },
  },
};
</script>
<style lang="css" scoped></style>
