<template>
  <div>
    <el-col :span="24">
      <h2>GLOBAL POSITION</h2>
    </el-col>
    <!-- Total values -->
    <div class="year-balance-view">
      <el-row class="text-center">
        <h3>Year Balance</h3>
      </el-row>
      <el-row :gutter="20" :type="'flex'" :justify="'center'">
        <el-col :span="4" class="text-center">
          <el-card
            shadow="always"
            :header="'INPUT (Total)'"
            :body-style="{ color: '#7CB5EC', padding: '0px' }"
          >
            <h2>{{ this.inputTotal }}&euro;</h2>
          </el-card>
        </el-col>
        <el-col :span="4" class="text-center">
          <el-card
            shadow="always"
            :header="'OUTPUT (Total)'"
            :body-style="{ color: '#303030', padding: '0px' }"
          >
            <h2>{{ this.outputTotal }}&euro;</h2>
          </el-card>
        </el-col>
        <el-col :span="4" class="text-center">
          <el-card
            shadow="always"
            :header="'BALANCE (Total)'"
            :body-style="{ color: BAL_POSITIVE_COLOR, padding: '0px' }"
          >
            <h2>{{ this.balanceTotal }}&euro;</h2>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- ./Total values -->

    <!-- line & barchart -->
    <BarAndLineChart
      :series="this.data"
      :categories="monthNames"
    ></BarAndLineChart>
    <!-- ./line & barchart -->

    <!-- Monthly avg values -->
    <div class="month-avg">
      <el-row class="text-center">
        <h3>Monthly average</h3>
      </el-row>
      <el-row :gutter="20" :type="'flex'" :justify="'center'">
        <el-col :span="4" class="text-center">
          <el-card
            shadow="always"
            :header="'INPUT'"
            :body-style="{ color: '#7CB5EC', padding: '0px' }"
          >
            <h2>{{ inputAvgFormatted }}</h2>
          </el-card>
        </el-col>
        <el-col :span="4" class="text-center">
          <el-card
            shadow="always"
            :header="'OUTPUT'"
            :body-style="{ color: '#303030', padding: '0px' }"
          >
            <h2>{{ outputAvgFormatted }}</h2>
          </el-card>
        </el-col>
        <el-col :span="4" class="text-center">
          <el-card
            shadow="always"
            :header="'BALANCE'"
            :body-style="{ color: BAL_POSITIVE_COLOR, padding: '0px' }"
          >
            <h2>{{ balanceAvgFormatted }}</h2>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- ./Monthly avg values -->
  </div>
</template>

<script>
import {
  sumArray,
  readableNumber,
  numberFormatter,
  getMonthNames,
} from '@/utils/utils'
import BarAndLineChart from './BarAndLineChart.vue'

export default {
  components: { BarAndLineChart },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      inputData: null,
      outputData: null,
      inputAvg: null,
      outputAvg: null,
      balanceAvg: null,
      inputTotal: null,
      outputTotal: null,
      balanceTotal: null,
      BAL_POSITIVE_COLOR: '#228412',
    }
  },
  watch: {
    data() {
      this.inputData = this.data.find((ele) => ele.name === 'input')
      this.outputData = this.data.find((ele) => ele.name === 'output')

      this.calculateMonthAvg()
      this.calculateTotalValues()
    },
  },
  computed: {
    inputAvgFormatted() {
      return numberFormatter(this.inputAvg)
    },
    outputAvgFormatted() {
      return numberFormatter(this.outputAvg)
    },
    balanceAvgFormatted() {
      return numberFormatter(this.balanceAvg)
    },
    monthNames() {
      return getMonthNames()
    },
  },

  methods: {
    calculateMonthAvg() {
      this.inputAvg = this.calculateAverage(this.inputData.data)
      this.outputAvg = this.calculateAverage(this.outputData.data)
      this.balanceAvg = this.inputAvg - this.outputAvg
    },
    calculateAverage(data) {
      const sum = sumArray(data)
      const dataWithValues = data.filter((value) => value !== 0)
      return Math.round(sum / dataWithValues.length)
    },
    calculateTotalValues() {
      const input = sumArray(this.inputData.data)
      const output = sumArray(this.outputData.data)
      this.inputTotal = readableNumber(input, 1)
      this.outputTotal = readableNumber(output, 1)
      this.balanceTotal = readableNumber(input - output, 1)
    },
  },
}
</script>

<style lang="css" scoped>
.year-balance-view,
.month-avg {
  margin: 36px 0;
}
</style>
