<template>
  <div class="">
    <highcharts :options="options"></highcharts>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
export default {
  components: {
    highcharts: Chart,
  },
  props: ['series', 'title'],

  computed: {
    options() {
      return {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false,
        },
        title: {
          text: this.title,
          align: 'center',
          verticalAlign: 'middle',
          y: 60,
        },
        tooltip: {
          pointFormat: '<b>{point.percentage:.1f}%</b>',
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
              distance: 30,
              style: {
                fontWeight: 'normal',
                color: 'black',
              },
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '120%',
          },
        },
        series: [
          {
            type: 'pie',
            innerSize: '50%',
            data: this.series,
          },
        ],
      }
    },
  },
  data() {
    return {
      optionsTest: {},
    }
  },
  created() {},
}
</script>
