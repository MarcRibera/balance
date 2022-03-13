<template>
  <BarChart :series="series" :title="'title'" />
</template>

<script>
import BarChart from './BarChart.vue'
export default {
  components: { BarChart },
  data() {
    return {
      series: [
        {
          name: 'Tokyo',
          data: [76.4, 80],
        },
        {
          name: 'New York',
          data: [83.6, 50],
        },
        {
          name: 'London',
          data: [51.2, 20],
        },
        {
          name: 'Berlin',
          data: [42.4, 200],
        },
      ],
    }
  },
}
</script>

<style></style>
