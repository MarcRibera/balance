<template>
  <el-button type="primary" @click="upload">
    Upload Team Work
    <i class="el-icon-upload el-icon-right"></i>
  </el-button>
</template>

<script>
// this component is only for test porpouse
// the data showed is getted into teamchart component

import * as d3 from "d3";

export default {
  data() {
    return {};
  },
  methods: {
    async upload() {
      const data = await d3.csv("/team_work_comma.csv");
      this.getSeriesTeamWork(data);
    },
  },
};
</script>

<style lang="css" scoped></style>
