<template>
  <el-row>
    <el-col :span="12">
      <BarChart :series="seriesTeamWork" :title="barchartTitle" />
    </el-col>

    <el-col :span="8">
      <BarChart
        :categories="categoriesSetas"
        :series="seriesSetas"
        :title="barchartTitleSetas"
      />
    </el-col>

    <el-col :span="4">
      <PieChart :series="seriesPiechart" :title="piechartTitleSetas" />
    </el-col>
  </el-row>
</template>

<script>
import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue'
import { csv as csv_loader } from 'd3'

const REDUCER = (accumulator, currentValue) => accumulator + currentValue

export default {
  components: { BarChart, PieChart },
  props: ['sprintCode'],
  data() {
    return {
      categoriesSetas: [],
      seriesTeamWork: [],
      seriesSetas: [],
      seriesPiechart: [],
      totalHours: null,
      totalHoursSetas: null,
      reducer: REDUCER,
      setasPercent: null,
    }
  },
  mounted() {},
  computed: {
    barchartTitle() {
      return `Tech Team - <b>${this.totalHours}h</b>`
    },
    barchartTitleSetas() {
      return `Setas - <b>${this.totalHoursSetas}h</b>`
    },
    piechartTitleSetas() {
      return `Setas Impact - <b>${this.setasPercent}%</b>`
    },
  },
  watch: {
    sprintCode() {
      this.loadDataTeamWork()
      this.loadDataTeamSetas()
    },
  },
  methods: {
    async loadDataTeamWork() {
      const data = await csv_loader(this.sprintCode + '/team_work.csv')
      this.calculateTeamWork(data)
    },
    async loadDataTeamSetas() {
      const data = await csv_loader(this.sprintCode + '/team_setas.csv')
      this.calculateTeamSetas(data)
    },
    calculateTeamWork(data) {
      let dates = []
      let timeSpentHours = []

      for (const { date, time_spent_hours } of data) {
        dates.push(date)
        timeSpentHours.push(parseFloat(time_spent_hours))
      }

      this.seriesTeamWork = [
        { name: 'Worked Hours', data: timeSpentHours, color: '#2373a4' },
      ]
      this.totalHours = timeSpentHours.reduce(this.reducer)
      this.totalHours = Math.round(this.totalHours * 10) / 10

      this.$emit('sprint-dates-calculated', dates)
    },
    calculateTeamSetas(data) {
      let authors = []
      let timeSpentHoursSetas = []

      for (const { author, time_spent_hours } of data) {
        authors.push(author)
        timeSpentHoursSetas.push(parseFloat(time_spent_hours))
      }
      this.categoriesSetas = [...authors]
      this.seriesSetas = [
        { name: 'Setas Hours', data: timeSpentHoursSetas, color: '#2373a4' },
      ]
      this.totalHoursSetas = timeSpentHoursSetas.reduce(this.reducer)
      this.totalHoursSetas = Math.round(this.totalHoursSetas * 10) / 10

      this.calculateSetasImpact()
    },
    calculateSetasImpact() {
      this.setasPercent = (this.totalHoursSetas / this.totalHours) * 100
      this.setasPercent = Math.round(this.setasPercent * 10) / 10
      const noSetasPercent = 100 - this.setasPercent

      this.seriesPiechart = [
        {
          name: '%',
          data: [
            {
              name: 'work total',
              y: noSetasPercent,
              sliced: true,
              selected: true,
              color: '#2373a4',
            },
            {
              name: 'setas',
              y: this.setasPercent,
              color: '#a7052b',
            },
          ],
        },
      ]
    },
  },
}
</script>

<style lang="css" scoped></style>
