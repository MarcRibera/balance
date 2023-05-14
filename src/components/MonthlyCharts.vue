<template>
  <div>
    <h2>MONTHLY EXPENSES</h2>
    <el-collapse class="collapse" v-model="activeItem">
      <el-card>
        <el-collapse-item name="1" title="Monthly  Category Evolution">
          <!-- linechart -->
          <el-col :span="24">
            <highcharts
              v-show="!loadingData"
              :options="lineChartOptions"
            ></highcharts>
          </el-col>
          <!-- ./linechart -->

          <!-- Barchart -->

          <el-col>
            <h2 style="margin: 54px 0 0 0">.</h2>
          </el-col>
          <el-col :span="6" v-for="month in yearData" :key="month.name">
            <highcharts
              v-if="hasDataMonth(month)"
              :options="getCurrentMonthOptions(month)"
            ></highcharts>
          </el-col>
          <!-- ./Barchart -->
        </el-collapse-item>
      </el-card>
    </el-collapse>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import {
  getCategories,
  getYears,
  getMonthNames,
  getColors,
  CATEGORIES_COLORS,
  sumArray,
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
      this.structureLinechartData()
    },
  },
  computed: {
    linechartSeries() {
      return this.linechartDataStructured[this.currentYear]
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
    lineChartOptions() {
      return {
        chart: {
          type: 'spline',
        },
        title: {
          text: this.title,
        },
        xAxis: {
          categories: getMonthNames(),
          //crosshair: true,
        },
        series: this.linechartSeries,
        yAxis: {
          min: 0,
          softMax: 10,
        },
        colors: getColors(),
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
          spline: {
            lineWidth: 5,
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
  methods: {
    createLinechartDataStructure() {
      const categories = getCategories()
      const years = getYears()

      for (const year of years) {
        this.linechartDataStructured[year] = categories.map((cat) => {
          return {
            name: cat,
            data: [],
            totalAmount: 0,
          }
        })
      }
    },
    structureLinechartData() {
      for (const yearKey in this.dataReceived) {
        for (const monthData of this.dataReceived[yearKey]) {
          for (const category of monthData.categories) {
            const currentCat = this.linechartDataStructured[yearKey].find(
              (cat) => cat.name === category.name
            )
            currentCat.data.push(category.amount * -1)
          }
        }
      }

      this.loadingData = false

      this.getTotalAmountByCategory()
    },
    getTotalAmountByCategory() {
      for (const yearKey in this.dataReceived) {
        for (const month of this.linechartDataStructured[yearKey]) {
          month.totalAmount = sumArray(month.data)
        }
      }

      this.$emit('get-total-amount-by-category', this.linechartDataStructured)
    },
    getTopCategories(data) {
      let categories = data.categories.filter((cat) => cat.data[0] > 1)
      categories.sort((a, b) => {
        if (a.data[0] > b.data[0]) {
          return -1
        }
        if (a.data[0] < b.data[0]) {
          return 1
        }
        return 0
      })

      return categories.slice(0, 7)
    },
    getCurrentCategoriesColors(series) {
      const currentColors = []

      for (const cat of series) {
        const found = CATEGORIES_COLORS.find(
          (colorEle) => colorEle.key.toLowerCase() === cat.name.toLowerCase()
        )
        currentColors.push(found.value)
      }

      return currentColors
    },
    getCurrentMonthOptions(data) {
      const monthOptions = {
        chart: {
          type: 'bar',
          height: '350px',
        },
        title: {
          text: data.name,
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          categories: [''],
        },
        yAxis: { min: 0, max: 700, title: { text: '' } },
        series: this.getTopCategories(data),
        plotOptions: {
          bar: {
            borderRadius: 7,
            dataLabels: {
              enabled: true,
            },
          },
          series: {
            groupPadding: 0,
            pointWidth: 20,
            dataLabels: [
              {
                enabled: true,
                y: 7,
              },
              {
                enabled: true,
                formatter: function () {
                  return this.point.series.name
                },
                y: -7,
                style: {
                  fontWeight: 'normal',
                  opacity: 0.9,
                  color: '#48494B',
                },
              },
            ],
          },
        },
      }
      const colors = this.getCurrentCategoriesColors(monthOptions.series)

      monthOptions.colors = colors

      return monthOptions
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
      linechartDataStructured: [],
      dataReceived: [],
      loadingData: false,
      activeItem: '0',
    }
  },
  created() {
    this.createLinechartDataStructure()
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
.monthly-charts-wrapper {
  margin-top: 24px;
}
</style>
