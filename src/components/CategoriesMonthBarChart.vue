<template>
  <el-collapse class="collapse">
    <el-card>
      <el-collapse-item title="Monthly  Category Evolution">
        <el-col :span="24">
          <highcharts v-if="!loadingData" :options="options"></highcharts>
        </el-col>

        <el-col :span="6" v-for="month in yearData" :key="month.name">
          <highcharts
            v-if="hasDataMonth(month)"
            :options="getCurrentOptions(month)"
          ></highcharts>
        </el-col>
      </el-collapse-item>
    </el-card>
  </el-collapse>
</template>

<script>
import { Chart } from 'highcharts-vue'
import {
  getCategories,
  getYears,
  getMonthNames,
  getCategoriesColors,
} from '@/utils/utils.js'

export default {
  components: {
    highcharts: Chart,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    currentYear: {
      type: Number,
      default: 2022,
    },
  },
  watch: {
    data() {
      this.dataReceived = this.data
      this.structureData()
    },
  },
  computed: {
    currentSeries() {
      console.log(
        'categories currentSeries',
        this.dataStructured[this.currentYear]
      )
      return this.dataStructured[this.currentYear]
    },
    yearData() {
      const series = this.dataReceived[this.currentYear]?.map((month) => {
        return {
          name: month.month,
          categories: month.categories.map((cat) => {
            return {
              name: cat.name,
              data: [cat.amount * -1],
            }
          }),
        }
      })
      return series
    },
    options() {
      return {
        title: {
          text: this.title,
        },
        xAxis: {
          categories: getMonthNames(),
          //crosshair: true,
        },
        series: this.currentSeries,
        yAxis: {
          min: 0,
          softMax: 10,
        },
        colors: getCategoriesColors(),
        legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'middle',
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
            },
          },
        },
      }
    },
  },
  methods: {
    createDataStructure() {
      const categories = getCategories()
      const years = getYears()

      for (const year of years) {
        this.dataStructured[year] = categories.map((cat) => {
          return {
            name: cat,
            data: [],
          }
        })
      }
    },
    structureData() {
      for (const yearKey in this.dataReceived) {
        for (const monthData of this.dataReceived[yearKey]) {
          for (const category of monthData.categories) {
            const currentCat = this.dataStructured[yearKey].find(
              (cat) => cat.name === category.name
            )
            currentCat.data.push(category.amount * -1)
          }
        }
      }
      this.loadingData = false
    },
    getCurrentOptions(data) {
      return {
        chart: {
          type: 'column',
        },
        title: {
          text: data.name,
        },
        xAxis: {
          categories: getMonthNames(),
          minPadding: 0,
          maxPadding: 0,
        },
        series: data.categories,
        yAxis: {
          min: 0,
          max: 700,
        },
        colors: getCategoriesColors(),
        plotOptions: {
          series: {
            groupPadding: 0,
            pointWidth: 20,
            dataLabels: {
              enabled: true,
            },
          },
        },
      }
    },
    hasDataMonth(month) {
      let hasData = false
      for (const catData of month.categories) {
        if (catData.data[0] > 0) hasData = true
      }
      return hasData
    },
  },
  data() {
    return {
      dataStructured: [],
      dataReceived: [],
      loadingData: false,
    }
  },
  created() {
    this.createDataStructure()
    this.loadingData = true
  },
}
</script>

<style lang="scss" scoped>
.collapse .el-card {
  margin-bottom: 12px;
  margin-top: 32px;
  ::v-deep .el-card__body {
    padding: 10px 16px;
  }
}
</style>
