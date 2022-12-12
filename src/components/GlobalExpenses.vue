<template>
  <div>
    <h2>Global expenses</h2>
    <h4>Expenses percent based on Total Year Input & Output</h4>

    <el-col :span="24">
      <div v-for="(cat, index) in categoriesExpenses" :key="index">
        <p>
          {{ cat.name }} -> {{ cat.totalFormatted }} -> In:
          {{ cat.percentOnInput }}% | Out:{{ cat.percentOnOutput }}%
        </p>
      </div>
    </el-col>
  </div>
</template>

<script>
import { sumArray, round2decimals, readableNumber } from '@/utils/utils'
import _clonedeep from 'lodash/cloneDeep'

export default {
  name: 'GlobalExpenses',
  components: {},
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
    },
  },
  computed: {
    yearInputAmount() {
      const yearInputData = this.yearData.find((ele) => ele.name === 'input')
      return sumArray(yearInputData.data)
    },
    yearOutputAmount() {
      const yearOutputData = this.yearData.find((ele) => ele.name === 'input')
      return sumArray(yearOutputData.data)
    },
  },
  data() {
    return {
      categoriesExpenses: [],
    }
  },
  methods: {
    calculateCategoriesExpenses(categories) {
      // calculate categories percent
      for (const cat of categories) {
        const percentOnInput = (cat.totalAmount / this.yearInputAmount) * 100
        const percentOnOutput = (cat.totalAmount / this.yearOutputAmount) * 100

        cat.percentOnInput = round2decimals(percentOnInput)
        cat.percentOnOutput = round2decimals(percentOnOutput)
      }

      // sort categories
      categories = this.getTopCategoriesSorted(categories)

      // add total with number formatted
      categories = categories.map((cat) => {
        return {
          ...cat,
          totalFormatted: readableNumber(cat.totalAmount * 1, 1),
        }
      })

      return categories
    },
    getTopCategoriesSorted(data) {
      let categories = data.sort((a, b) => {
        if (a.percentOnInput * 1 > b.percentOnInput * 1) {
          return -1
        }
        if (a.percentOnInput * 1 < b.percentOnInput * 1) {
          return 1
        }
        return 0
      })

      return categories.slice(0)
    },
  },
}
</script>
