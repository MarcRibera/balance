<template>
  <div id="app">
    <el-container>
      <el-aside>
        <LoadData
          @get-data="handleDataLoaded"
          @get-inout-series="getInoutSeries"
        />
        <!-- <UploadButton></UploadButton> -->
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
          <el-col :span="24" class="text-center">
            <h3>GLOBAL POSITION</h3>
          </el-col>
          <el-col :span="24">
            <YearBalance :data="inoutYearData">
              <MonthBarchart :data="inoutYearData"></MonthBarchart>
            </YearBalance>
          </el-col>

          <el-col :span="24" class="text-center space-60">
            <h3>MONTHLY CATEGORY EVOLUTION</h3>
          </el-col>

          <el-col :span="24">
            <CategoriesMonthBarChart
              :data="dataStructured"
              :currentYear="currentYear"
            ></CategoriesMonthBarChart>
          </el-col>

          <el-col :span="24" class="text-center space-60">
            <h3>MONTHLY MOVEMENTS</h3>
          </el-col>

          <el-col :span="24">
            <Table
              :data="dataStructured"
              :currentYear="currentYear"
              :currentMonth="currentMonth"
            ></Table>
          </el-col>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LoadData from './components/LoadData.vue'
import Table from './components/Table.vue'
import MonthBarchart from './components/MonthBarchart.vue'
import DateSelector from '@/components/DateSelector.vue'
import CategoriesMonthBarChart from '@/components/CategoriesMonthBarChart.vue'
import YearBalance from '@/components/YearBalance.vue'

export default {
  name: 'App',
  components: {
    LoadData,
    Table,
    MonthBarchart,
    DateSelector,
    CategoriesMonthBarChart,
    YearBalance,
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
    handleDataLoaded(data) {
      console.log('APP, get data structured from data loader', data)
      this.dataStructured = data
    },
    getInoutSeries(data) {
      this.inoutSeries = data
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

<style lang="scss">
.app-header {
  display: flex;
  p {
    margin-left: 16px;
  }
}
</style>
