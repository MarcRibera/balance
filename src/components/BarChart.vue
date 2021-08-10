<template>
  <div class="">
    <highcharts :options="options"></highcharts>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
//import { dateFormatter } from "@/utils/utils";

export default {
  components: {
    highcharts: Chart,
  },
  props: ["categories", "series", "title"],
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
        // xAxis: {
        //   categories: this.categories,
        //   labels: {
        //     formatter: function () {
        //       if (this.categoriesAreDates) {
        //         return dateFormatter(this.value);
        //       }
        //       return this.value;
        //     },
        //   },
        // },
        xAxis: {
          categories: this.categories ? this.categories : this.getSprintDays(),
        },
        yAxis: {
          min: 0,
          max: null,
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
  mounted() {
    setTimeout(() => {
      this.triggerToRender = true;
    }, 1000);
  },
  methods: {
    getSprintDays() {
      let categories = [];
      for (var i = 1; i < 15; i++) {
        const item = "Day " + i;
        categories.push(item);
      }
      return categories;
    },
  },
};
</script>
