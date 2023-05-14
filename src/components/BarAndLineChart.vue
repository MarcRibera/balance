<template>
  <div>
    <el-switch
      v-model="isBarchartType"
      inactive-color="#222222"
      active-text="Barchart"
      inactive-text="LineChart"
    >
    </el-switch>

    <highcharts :options="options"></highcharts>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'

export default {
  components: {
    highcharts: Chart,
  },
  props: ['categories', 'series', 'title'],
  computed: {
    options() {
      return {
        chart: {
          type: this.isBarchartType ? 'column' : 'spline',
          height: '250px',
        },
        title: {
          text: this.title,
        },
        series: this.series,
        xAxis: {
          categories: this.categories,
        },
        yAxis: {
          //min: 0,
          softMax: 10,
        },
        plotOptions: {
          series: {
            borderRadius: 3,
            borderColor: '',
            dataLabels: {
              allowOverlap: true,
              enabled: true,
              rotation: -30,
              y: -15,
              x: 10,
            },
          },
          spline: {
            lineWidth: 4,
            states: {
              hover: {
                lineWidth: 5,
              },
            },
          },
        },
      }
    },
  },
  data() {
    return {
      chartType: 'column',
      isBarchartType: true,
    }
  },
  mounted() {
    setTimeout(() => {
      this.triggerToRender = true
    }, 1000)
  },
  methods: {
    setChartType(type) {
      this.chartType = type
    },
  },
}
</script>
