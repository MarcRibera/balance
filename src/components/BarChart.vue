<template>
  <div class="">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";

export default {
  components: {
    highcharts: Chart,
  },
  props: ["dates", "values", "title", "plotOptions"],
  data() {
    return {
      chartOptions: {
        chart: {
          type: "column",
        },
        title: {
          text: this.title,
        },
        series: [{ data: this.values }],
        xAxis: { categories: this.dates },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
            },
          },
        },
      },
    };
  },
};
</script>
