<template>
  <highcharts :options="options"></highcharts>
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
          type: 'column',
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
  methods: {},
}
</script>
