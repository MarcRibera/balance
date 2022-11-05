<template>
  <div>
    <!-- Total values -->
    <el-row class="text-center">
      <h4>Total year values</h4>
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
          :body-style="{ color: '#51e151', padding: '0px' }"
        >
          <h2>{{ this.balanceTotal }}&euro;</h2>
        </el-card>
      </el-col>
    </el-row>
    <!-- ./Total values -->

    <!-- this slot is a "guarrada", but looks better is a chart is in the midle -->
    <slot></slot>

    <!-- Monthly avg values -->
    <el-row class="text-center">
      <h4>Monthly average</h4>
    </el-row>
    <el-row :gutter="20" :type="'flex'" :justify="'center'">
      <el-col :span="4" class="text-center">
        <el-card
          shadow="always"
          :header="'INPUT (Month avg)'"
          :body-style="{ color: '#7CB5EC', padding: '0px' }"
        >
          <h2>{{ inputAvgFormatted }}</h2>
        </el-card>
      </el-col>
      <el-col :span="4" class="text-center">
        <el-card
          shadow="always"
          :header="'OUTPUT (Month avg)'"
          :body-style="{ color: '#303030', padding: '0px' }"
        >
          <h2>{{ outputAvgFormatted }}</h2>
        </el-card>
      </el-col>
      <el-col :span="4" class="text-center">
        <el-card
          shadow="always"
          :header="'BALANCE (Month avg)'"
          :body-style="{ color: '#51e151', padding: '0px' }"
        >
          <h2>{{ balanceAvgFormatted }}</h2>
        </el-card>
      </el-col>
    </el-row>
    <!-- ./Monthly avg values -->
  </div>
</template>

<script>
import { sumArray, readableNumber, numberFormatter } from '@/utils/utils'

export default {
  components: {},
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

<style></style>
