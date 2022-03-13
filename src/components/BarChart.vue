<template>
  <div class="">
    <highcharts :options="options"></highcharts>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
//import { dateFormatter } from '@/utils/utils'

export default {
  components: {
    highcharts: Chart,
  },
  props: ['categories', 'series', 'title'],
  computed: {
    options() {
      return {
        chart: {
          type: 'column',
          spacing: [40, 40, 40, 40],
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
          softMax: 10,
        },
        plotOptions: {
          series: {
            // borderColor: "#303030",
            dataLabels: {
              enabled: true,
            },
          },
        },
      }
    },
  },
  data() {
    return {}
  },
  mounted() {
    setTimeout(() => {
      this.triggerToRender = true
    }, 1000)
  },
  methods: {
    getSprintDays() {
      return [
        'Wed 1',
        'Thu 2',
        'Fri 3',
        'Sat 4',
        'Sun 5',
        'Mon 6',
        'Tue 7',
        'Wed 8',
        'Thu 9',
        'Fri 10',
        'Sat 11',
        'Sun 12',
        'Mon 13',
        'Thu 14',
      ]
    },
  },
}
</script>
