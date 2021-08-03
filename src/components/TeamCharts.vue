<template>
  <el-row>
    <el-col :span="12" v-if="dates.length > 0">
      <p>Total Worked Hours: {{ totalHours }}</p>
      <BarChart
        :dates="dates"
        :values="values"
        :title="'Team BarChart'"
        :options="plotOptions"
      />
    </el-col>
  </el-row>
</template>

<script>
import BarChart from "./BarChart.vue";
import { csv as csv_loader } from "d3";

export default {
  components: { BarChart },
  data() {
    return {
      dates: [],
      values: [],
      totalHours: null,
    };
  },
  // async mounted() {
  //   const data = await csv_loader("/team_work_comma.csv");
  //   console.log("Team Chart loaded data", data);
  //
  //   for (const { date, time_spent_hours } of data) {
  //     this.dates.push(date);
  //     this.values.push(parseFloat(time_spent_hours));
  //   }
  // },
  async mounted() {
    const data = await csv_loader("/team_work_comma.csv");
    console.log("Team Chart loaded data", data);

    let dates = [];
    let timeSpentHours = [];
    for (const { date, time_spent_hours } of data) {
      dates.push(date);
      timeSpentHours.push(parseFloat(time_spent_hours));
    }
    this.dates = [...dates];
    this.values = [...timeSpentHours];
    this.totalHours = this.values.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
  },
};
</script>

<style lang="css" scoped></style>
