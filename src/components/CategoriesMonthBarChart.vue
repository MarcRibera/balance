<template>
  <el-collapse class="collapse" v-model="activeItem">
    <el-card>
      <el-collapse-item name="1" title="Monthly  Category Evolution">
        <el-col :span="24">
          <highcharts
            v-show="!loadingData"
            :options="lineChartOptions"
          ></highcharts>
        </el-col>

        <h2 style="padding: 0 8%">Top 7 Expensive Categories</h2>
        <el-col :span="6" v-for="month in yearData" :key="month.name">
          <highcharts
            v-if="hasDataMonth(month)"
            :options="getCurrentMonthOptions(month)"
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
  getColors,
  CATEGORIES_COLORS,
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
    lineChartOptions() {
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
      dataStructured: [],
      dataReceived: [],
      loadingData: false,
      activeItem: '1',
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
