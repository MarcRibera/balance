<template>
  <el-button type="primary" @click="upload">
    Upload Team Work
    <i class="el-icon-upload el-icon-right"></i>
  </el-button>
</template>

<script>
// this component is only for test porpouse
// the data showed is getted into teamchart component

import * as d3 from 'd3'

export default {
  data() {
    return {
      dataCleaned: [],
    }
  },
  methods: {
    async upload() {
      const data = await d3.csv('balances/data.csv')
      this.dataCleaned = data.map((row) => {
        return {
          date: row.date,
          category: row.category,
          amount: row.amount,
          description: row.description,
        }
      })
      console.log('dataCleaned', this.dataCleaned)
      this.splitPerMonth()

      // for (var i = 0; i < data.length; i++) {
      //   console.log(data[i])
      // }
    },
    splitPerMonth() {
      //const months = []
      this.dataCleaned.forEach((entry) => {
        console.log('', entry)
      })
    },
  },
}
</script>

<style lang="css" scoped></style>
