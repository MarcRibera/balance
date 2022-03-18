<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <LoadData @get-data="loadData" @get-inout-series="getInoutSeries" />
      </el-aside>
      <el-container>
        <el-header class="app-header">
          <p>
            From <b>{{ since }}</b> to <b>{{ until }}</b>
          </p>

          <DateSelector :type="'year'" @select="getYear" />
          <DateSelector :type="'month'" @select="getMonth" />
        </el-header>
        <el-main>
          <CategoriesMonthBarChart></CategoriesMonthBarChart>
          <MonthBarchart :data="inoutYearData"></MonthBarchart>
          <Table
            :data="dataStructured"
            :currentYear="currentYear"
            :currentMonth="currentMonth"
          ></Table>

          <!-- <TeamCharts
            :sprintCode="currentSprint"
            @sprint-dates-calculated="getSprintDates"
          />
          <MembersBarchart :sprintCode="currentSprint" /> -->
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import MembersBarchart from './components/MembersBarchart.vue'
// import TeamCharts from './components/TeamCharts.vue'
// import { sprintDateFormatter } from './utils/utils.js'
import LoadData from './components/LoadData.vue'
import Table from './components/Table.vue'
import MonthBarchart from './components/MonthBarchart.vue'
import DateSelector from '@/components/DateSelector.vue'
import CategoriesMonthBarChart from '@/components/CategoriesMonthBarChart.vue'

export default {
  name: 'App',
  components: {
    LoadData,
    Table,
    MonthBarchart,
    DateSelector,
    CategoriesMonthBarChart,
  },

  computed: {
    inoutYearData() {
      return this.inoutSeries[this.currentYear]
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
    }
  },
  methods: {
    loadData(data) {
      console.log('get dat', data)
      this.dataStructured = data
    },
    getInoutSeries(data) {
      this.inoutSeries = data
      console.log('getInoutSeries', data)
    },
    getYear(year) {
      this.currentYear = year
    },
    getMonth(month) {
      this.currentMonth = month
    },
    // setCurrentSprint(value) {
    //   console.log('value', value)
    //   this.currentSprint = value
    // },
    // getSprintDates(dates) {
    //   this.since = sprintDateFormatter(dates[0])
    //   this.until = sprintDateFormatter(dates[dates.length - 1])
    // },
  },
}
</script>

<style lang="scss">
.app-header {
  display: flex;
  p {
    margin-left: 16px;
  }
}
</style>
