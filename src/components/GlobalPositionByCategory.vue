<template>
  <el-col :span="24" class="global-category-wrapper">
    <h2>GLOBAL POSITION BY CATEGORY</h2>
    <p>
      Out & IN -> % based on Total Year Output or Input // Avg -> Monthly
      average
    </p>

    <div class="cards-wrapper" v-if="showChart">
      <MonthlyCard
        v-for="(cat, index) in categoriesExpenses"
        :key="index"
        :category="cat"
      >
      </MonthlyCard>
    </div>

    <div>
      <PieChart
        :series="chartSeriesOut"
        :title="'Percent based <br> on output'"
      ></PieChart>
    </div>
  </el-col>
</template>

<script>
import {
  sumArray,
  round2decimals,
  readableNumber,
  getCategoryColor,
} from '@/utils/utils'
import _clonedeep from 'lodash/cloneDeep'
import MonthlyCard from './MonthlyCard.vue'
import PieChart from './PieChart.vue'

export default {
  name: 'GlobalExpenses',
  components: { MonthlyCard, PieChart },
  props: {
    categoriesData: {
      type: Array,
      default: () => [],
    },
    yearData: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    categoriesData() {
      const categoriesDataCloned = _clonedeep(this.categoriesData)
      this.categoriesExpenses = this.calculateCategoriesExpenses(
        categoriesDataCloned
      )
      this.refreshChart()
    },
  },
  computed: {
    yearInputAmount() {
      const yearInputData = this.yearData.find((ele) => ele.name === 'input')
      return sumArray(yearInputData.data)
    },
    yearOutputAmount() {
      const yearOutputData = this.yearData.find((ele) => ele.name === 'output')
      return sumArray(yearOutputData.data)
    },
    chartSeriesOut() {
      console.log('this.categoriesExpenses', this.categoriesExpenses)
      return this.categoriesExpenses.map((cat) => {
        return {
          name: cat.name,
          y: Number(cat.percentOnOutput),
          color: getCategoryColor(cat.name),
        }
      })
    },
  },
  data() {
    return {
      categoriesExpenses: [],
      showChart: false,
    }
  },
  methods: {
    calculateCategoriesExpenses(categories) {
      // get months length with values. Is based on Food cat, cause it will be always filled
      const foodCat = categories.find((cat) => cat.name === 'Food')
      const monthsFilled = foodCat.data.filter((val) => val !== 0)

      // calculate categories percent
      for (const cat of categories) {
        const percentOnInput = (cat.totalAmount / this.yearInputAmount) * 100
        const percentOnOutput = (cat.totalAmount / this.yearOutputAmount) * 100

        cat.percentOnInput = round2decimals(percentOnInput, 0)
        cat.percentOnOutput = round2decimals(percentOnOutput, 0)
        cat.monthAverage = round2decimals(
          cat.totalAmount / monthsFilled.length,
          0
        )
      }

      // sort categories
      categories = this.getTopCategoriesSorted(categories)

      // add total with number formatted
      categories = categories.map((cat) => {
        return {
          ...cat,
          totalFormatted: readableNumber(cat.totalAmount * 1, 2, true),
        }
      })

      return categories
    },
    getTopCategoriesSorted(data) {
      let categories = data.sort((a, b) => {
        if (a.totalAmount * 1 > b.totalAmount * 1) {
          return -1
        }
        if (a.totalAmount * 1 < b.totalAmount * 1) {
          return 1
        }
        return 0
      })

      return categories.slice(0)
    },
    refreshChart() {
      this.showChart = false
      setTimeout(() => {
        this.showChart = true
      })
    },
  },
}
</script>

<style lang="scss">
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 16px;
  margin-top: 24px;
}

.global-category-wrapper {
  margin-top: 36px;
}
</style>
