<template>
  <div id="app">
    <el-container>
      <el-aside>
        <LoadData
          @get-data="handleDataLoaded"
          @get-inout-series="getInoutSeries"
        />
      </el-aside>
      <el-container>
        <DatePicker
          @select-year="getYear"
          @select-month="getMonth"
        ></DatePicker>

        <el-main>
          <GlobalPosition :data="inoutYearData">
            <MonthBarchart :data="inoutYearData"></MonthBarchart>
          </GlobalPosition>

          <GlobalExpenses
            :yearData="inoutYearData"
            :categoriesData="currentYearTotalAmountByCategory"
          ></GlobalExpenses>

          <CategoriesMonthBarChart
            :data="dataStructured"
            :currentYear="currentYear"
            @get-total-amount-by-category="getTotalAmountByCategory"
          ></CategoriesMonthBarChart>

          <MonthMovements
            :data="dataStructured"
            :currentYear="currentYear"
            :currentMonth="currentMonth"
          ></MonthMovements>
        </el-main>

        <el-footer>
          <TheFooter></TheFooter>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LoadData from './components/LoadData.vue'
import MonthMovements from './components/MonthMovements.vue'
import MonthBarchart from './components/MonthBarchart.vue'
import GlobalExpenses from './components/GlobalExpenses.vue'
import CategoriesMonthBarChart from '@/components/CategoriesMonthBarChart.vue'
import GlobalPosition from '@/components/GlobalPosition.vue'
import TheFooter from '@/components/TheFooter.vue'
import DatePicker from '@/components/DatePicker.vue'

export default {
  name: 'App',
  components: {
    LoadData,
    MonthMovements,
    MonthBarchart,
    DatePicker,
    CategoriesMonthBarChart,
    GlobalPosition,
    TheFooter,
    GlobalExpenses,
  },

  computed: {
    inoutYearData() {
      return this.inoutSeries[this.currentYear]
    },
    currentYearTotalAmountByCategory() {
      return this.totalAmountByCategory[this.currentYear]
    },
  },
  data() {
    return {
      dates: [],
      currentSprint: '',
      currentYear: null,
      currentMonth: null,
      since: null,
      until: null,
      dataStructured: [],
      inoutSeries: [],
      totalAmountByCategory: [],
    }
  },
  methods: {
    handleDataLoaded(data) {
      console.log('APP, get data structured from LoadData', data)
      this.dataStructured = data
    },
    getInoutSeries(data) {
      this.inoutSeries = data
    },
    getTotalAmountByCategory(data) {
      this.totalAmountByCategory = data
    },
    getYear(year) {
      this.currentYear = year
    },
    getMonth(month) {
      this.currentMonth = month
    },
  },
}
</script>

<style lang="scss"></style>
