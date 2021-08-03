<template>
  <el-button type="primary" @click="upload"
    >Upload<i class="el-icon-upload el-icon-right"></i
  ></el-button>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {};
  },
  methods: {
    async upload() {
      console.log("upload form uload Data component");
      const data = await d3.csv("/team_work_comma.csv");
      console.log(data);
      for (const { name } of data) {
        console.log(name);
      }
    },
  },
};
</script>

<style lang="css" scoped></style>
