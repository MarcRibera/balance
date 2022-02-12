<template>
  <el-button type="primary" @click="loadData">
    Upload Team Work
    <i class="el-icon-upload el-icon-right"></i>
  </el-button>
</template>

<script>
// this component is only for test porpouse
// the data showed is getted into teamchart component

import { csv as loadCsv } from 'd3'
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
const CATEGORIES = [
  'Taxi',
  'House',
  'Salary',
  'Food',
  'Entertainment',
  'Eating out',
  'Car',
  'Cosmetic',
  'Transport',
  'Health',
  'Bills',
  'Sports',
  'Clothes',
  'Gifts',
]

export default {
  data() {
    return {
      dataCleaned: [],
      dataStructured: [],
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
            categories: CATEGORIES.map((cat) => {
              return {
                name: cat,
                amount: 0,
              }
            }),
          }
          this.dataStructured[year].push(monthData)
        }
      }

      console.log('this.dataStructured', this.dataStructured)
    },
    async loadData() {
      const data = await loadCsv('balances/data.csv')
      this.dataCleaned = data.map((row) => {
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
      for (const entry of this.dataCleaned) {
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

      this.cleanEmptyMonths()
    },
    cleanEmptyMonths() {
      // for (const year of YEARS) {
      //   for (const [i, month] of this.dataStructured[year].entries()) {
      //     if (month.entries.length === 0) {
      //       console.log(`${month.month} ${year} index ${i}`)
      //       this.dataStructured[year].splice(i, 1)
      //     }
      //   }
      // }
      console.log('this.dataStructured', this.dataStructured)
      this.$emit('get-data', this.dataStructured)
    },
  },
}
</script>

<style lang="css" scoped></style>
