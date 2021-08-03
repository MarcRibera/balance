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
    return {};
  },
};
</script>

<style lang="css" scoped></style>
