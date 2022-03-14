<template>
  <div>
    <BarChart :series="data" :title="'title'" :categories="monthNames" />
    <p>data received</p>
    {{ data }}
  </div>
</template>

<script>
import BarChart from './BarChart.vue'
import { getMonthNames } from '@/utils/utils'

export default {
  components: { BarChart },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  computed: {
    monthNames() {
      return getMonthNames()
    },
  },
}

// const seriesExample = [
//   {
//     name: 'input',
//     data: [1500, 1500, 1500, 1500, 1500],
//   },
//   {
//     name: 'output',
//     data: [1899, 2500, 1200, 1400, 1699],
//   },
// ]
</script>

<style></style>
