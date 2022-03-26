<template>
  <el-button type="primary" @click="loadData">
    Upload Team Work
    <i class="el-icon-upload el-icon-right"></i>
  </el-button>
</template>

<script>
import { csv as loadCsv } from 'd3'
import { round2decimals } from '@/utils/utils'
import { getCategories } from '@/utils/utils.js'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const YEARS = [2021, 2022]

export default {
  data() {
    return {
      dataLoadedCleaned: [],
      dataStructured: [],
      inoutSeries: [],
      categories: getCategories(),
    }
  },
  created() {
    this.createDataStructure()
    this.loadData()
  },
  methods: {
    createDataStructure() {
      for (const year of YEARS) {
        this.dataStructured[year] = []
        for (const month of MONTHS) {
          const monthData = {
            month: month,
            entries: [],
            totalIn: 0,
            totalOut: 0,
            balance: 0,
            categories: this.categories.map((cat) => {
              return {
                name: cat,
                amount: 0,
              }
            }),
          }
          this.dataStructured[year].push(monthData)
        }
      }
    },
    async loadData() {
      const data = await loadCsv('balances/data.csv')
      this.dataLoadedCleaned = data.map((row) => {
        return {
          date: row.date,
          category: row.category,
          amount: row.amount,
          description: row.description,
        }
      })
      this.structureData()
    },
    structureData() {
      //const months = []
      for (const entry of this.dataLoadedCleaned) {
        const currentYear = entry.date.slice(6, 10)
        const currentMonth = entry.date.slice(3, 5)
        const currentMonthNumber = currentMonth * 1

        let currentAmount = entry.amount
        currentAmount = currentAmount.replace(',', '') // If there is any ',' remove it
        currentAmount = parseFloat(currentAmount)

        // get month form data structured
        const monthDataStructured = this.dataStructured[currentYear][
          currentMonthNumber - 1
        ]
        // add entry
        monthDataStructured.entries.push(entry)

        // add input or output
        currentAmount > 0
          ? (monthDataStructured.totalIn += currentAmount)
          : (monthDataStructured.totalOut += currentAmount)

        // add balance
        monthDataStructured.balance =
          monthDataStructured.totalIn - monthDataStructured.totalOut * -1

        // add entry ammount to cat
        let category = monthDataStructured.categories.find(
          (cat) => cat.name === entry.category
        )
        category.amount += currentAmount
      }

      this.$emit('get-data', this.dataStructured)
      this.structureInoutSeries()
      // this.cleanEmptyMonths()
    },
    structureInoutSeries() {
      for (const year in this.dataStructured) {
        this.inoutSeries[year] = [
          {
            name: 'input',
            data: [],
          },
          {
            name: 'output',
            data: [],
          },
        ]

        for (const month of this.dataStructured[year]) {
          const monthTotalIn = round2decimals(month.totalIn) * 1
          const monthTotalOut = round2decimals(month.totalOut) * -1
          this.inoutSeries[year][0].data.push(monthTotalIn)
          this.inoutSeries[year][1].data.push(monthTotalOut)
        }
      }
      this.$emit('get-inout-series', this.inoutSeries)
    },
    // cleanEmptyMonths() {
    //   if (this.dataStructured.length) {
    //     for (const year in this.dataStructured) {
    //       this.dataStructuredCleaned[year] = []
    //       for (const month of this.dataStructured[year]) {
    //         if (month.entries.length) {
    //           this.dataStructuredCleaned[year].push(month)
    //         }
    //       }
    //     }
    //   }
    // },
  },
}
</script>

<style lang="css" scoped></style>
