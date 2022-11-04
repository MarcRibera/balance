<template>
  <div>
    <vue-csv-import
      headers
      v-model="csv"
      :autoMatchFields="true"
      :autoMatchIgnoreCase="true"
      :map-fields="['date', 'category', 'amount', 'description']"
    >
    </vue-csv-import>

    <button @click.prevent="structureData()">load</button>
  </div>
</template>

<script>
import { getCategories, round2decimals } from '@/utils/utils.js'
import { VueCsvImport } from 'vue-csv-import'

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
  components: {
    VueCsvImport,
  },
  data() {
    return {
      csv: null,
      dataLoadedCleaned: [],
      dataStructured: [],
      inoutSeries: [],
      categories: getCategories(),
    }
  },
  created() {
    this.createDataStructure()
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

    structureData() {
      this.csv.shift() // remove csv headers

      for (const entry of this.csv) {
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

        if (category) {
          category.amount += currentAmount
          category.amount = round2decimals(category.amount) * 1
        }
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
          {
            name: 'balance',
            data: [],
          },
        ]

        for (const month of this.dataStructured[year]) {
          const monthTotalIn = Math.round(month.totalIn) * 1
          const monthTotalOut = Math.round(month.totalOut) * -1
          const monthAverage = monthTotalIn - monthTotalOut

          this.inoutSeries[year][0].data.push(monthTotalIn)
          this.inoutSeries[year][1].data.push(monthTotalOut)
          this.inoutSeries[year][2].data.push(monthAverage)
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
