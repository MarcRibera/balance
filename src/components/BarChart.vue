<template>
  <div class="">
    <highcharts :options="options"></highcharts>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import { dateFormatter } from "@/utils/utils";

export default {
  components: {
    highcharts: Chart,
  },
  props: ["categories", "series", "title", "categoriesAreDates"],
  computed: {
    options() {
      return {
        chart: {
          type: "column",
        },
        title: {
          text: this.title,
        },
        series: this.series,
        xAxis: {
          categories: this.categories,
          labels: {
            formatter: function () {
              if (this.categoriesAreDates) {
                return dateFormatter(this.value);
              }
              return this.value;
            },
          },
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
            },
          },
        },
      };
    },
  },
  data() {
    return {};
  },
};
</script>
