<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <LoadData @get-data="getData" />
      </el-aside>
      <el-container>
        <el-header class="app-header">
          <p>
            From <b>{{ since }}</b> to <b>{{ until }}</b>
          </p>
        </el-header>
        <el-main>
          <Table :data="dataStructured"></Table>

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
import { sprintDateFormatter } from './utils/utils.js'
import LoadData from './components/LoadData.vue'
import Table from './components/Table.vue'

export default {
  name: 'App',
  components: {
    LoadData,
    Table,
  },
  data() {
    return {
      dates: [],
      currentSprint: '',
      since: null,
      until: null,
      dataStructured: [],
    }
  },
  methods: {
    setCurrentSprint(value) {
      console.log('value', value)
      this.currentSprint = value
    },
    getSprintDates(dates) {
      this.since = sprintDateFormatter(dates[0])
      this.until = sprintDateFormatter(dates[dates.length - 1])
    },
    getData(data) {
      console.log('get dat', data)
      this.dataStructured = data
    },
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
