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
        </el-header>
        <el-main>
          <Table :data="dataStructured"></Table>
          <MonthBarchart :data="inoutYearData"></MonthBarchart>
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

export default {
  name: 'App',
  components: {
    LoadData,
    Table,
    MonthBarchart,
  },
  computed: {
    inoutYearData() {
      const year = '2021'
      return this.inoutSeries[year]
    },
  },
  data() {
    return {
      dates: [],
      currentSprint: '',
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
      //this.inoutSeries = data
      this.inoutSeries = data
      console.log('getInoutSeries', data)
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
