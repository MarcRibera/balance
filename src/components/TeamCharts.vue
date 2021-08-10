<template>
  <el-row>
    <el-col :span="12" v-if="categoriesTeamWork.length > 0">
      <BarChart :series="seriesTeamWork" :title="barchartTitle" />
    </el-col>

    <el-col :span="8" v-if="categoriesSetas.length > 0">
      <BarChart
        :categories="categoriesSetas"
        :series="seriesSetas"
        :title="barchartTitleSetas"
      />
    </el-col>

    <el-col :span="4">
      <PieChart :series="seriesPiechart" :title="'Setas Impact'" />
    </el-col>
  </el-row>
</template>

<script>
import BarChart from "./BarChart.vue";
import PieChart from "./PieChart.vue";
import { csv as csv_loader } from "d3";

export default {
  components: { BarChart, PieChart },
  props: ["sprintCode"],
  data() {
    return {
      categoriesTeamWork: [],
      categoriesSetas: [],
      seriesTeamWork: [],
      seriesSetas: [],
      seriesPiechart: [],
      totalHours: null,
      totalHoursSetas: null,
    };
  },
  mounted() {},
  computed: {
    barchartTitle() {
      return `Tech Team - ${this.totalHours}h`;
    },
    barchartTitleSetas() {
      return `Setas - ${this.totalHoursSetas}h`;
    },
  },
  watch: {
    sprintCode() {
      this.loadDataTeamWork();
      this.loadDataTeamSetas();
    },
  },
  methods: {
    async loadDataTeamWork() {
      const data = await csv_loader(this.sprintCode + "/team_work.csv");
      console.log("TeamChart COMPONENT loaded data", data);

      let dates = [];
      let timeSpentHours = [];
      for (const { date, time_spent_hours } of data) {
        dates.push(date);
        timeSpentHours.push(parseFloat(time_spent_hours));
      }
      this.categoriesTeamWork = [...dates];
      this.seriesTeamWork = [{ name: "Worked Hours", data: timeSpentHours }];
      this.totalHours = timeSpentHours.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
      this.totalHours = Math.round(this.totalHours * 10) / 10;
    },
    async loadDataTeamSetas() {
      const data = await csv_loader(this.sprintCode + "/team_setas.csv");
      console.log("setas", data);
      let authors = [];
      let timeSpentHoursSetas = [];

      for (const { author, time_spent_hours } of data) {
        authors.push(author);
        timeSpentHoursSetas.push(parseFloat(time_spent_hours));
      }
      this.categoriesSetas = [...authors];
      this.seriesSetas = [{ name: "Setas Hours", data: timeSpentHoursSetas }];
      this.totalHoursSetas = timeSpentHoursSetas.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );

      this.loadSetasImpact();
    },
    loadSetasImpact() {
      let setasPercent = (this.totalHoursSetas / this.totalHours) * 100;
      setasPercent = Math.round(setasPercent * 10) / 10;
      const noSetasPercent = 100 - setasPercent;
      this.seriesPiechart = [
        {
          name: "%",
          data: [
            {
              name: "work total",
              y: noSetasPercent,
              sliced: true,
              selected: true,
            },
            {
              name: "setas",
              y: setasPercent,
            },
          ],
        },
      ];
    },
  },
};
</script>

<style lang="css" scoped></style>
