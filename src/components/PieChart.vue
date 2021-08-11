<template>
  <div class="">
    <highcharts :options="options"></highcharts>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
export default {
  components: {
    highcharts: Chart,
  },
  props: ["series", "title"],

  computed: {
    options() {
      return {
        chart: {
          type: "pie",
          spacing: [40, 40, 40, 40],
        },
        title: {
          text: this.title,
        },
        series: this.series,
        plotOptions: {
          pie: {
            size: "70%",
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            },
          },
        },
      };
    },
  },
  data() {
    return {
      optionsTest: {},
    };
  },
  created() {},
};
</script>
