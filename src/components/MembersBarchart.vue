<template>
  <el-row>
    <el-col :span="12" v-for="(member, index) in data" :key="index">
      <BarChart
        :dates="member.dates"
        :values="member.values"
        :title="member.name"
      />
    </el-col>
  </el-row>
</template>

<script>
import BarChart from "./BarChart.vue";

export default {
  components: { BarChart },
  props: {
    data: Array,
  },
  data() {
    return {
      dates: ["2021-03-1", "2021-03-2", "2021-03-3", "2021-03-4", "2021-03-5"],
      values: [5, 6, 2, 3, 5.5],
    };
  },
};
</script>

<style lang="css" scoped></style>
