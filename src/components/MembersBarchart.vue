<template>
  <el-row>
    <el-col :span="6" v-for="(member, index) in membersData" :key="index">
      <BarChart
        :series="member.series"
        :title="member.name"
        :categories="categories"
      />
    </el-col>
  </el-row>
</template>

<script>
import BarChart from "./BarChart.vue";
import { csv as csv_loader } from "d3";

export default {
  components: { BarChart },
  props: {
    data: Array,
  },
  data() {
    return {
      membersData: [],
      categories: [],
      loading: true,
    };
  },
  mounted() {
    this.loadData();

    setTimeout(() => {
      this.fillCategories();
    }, 1000);
  },
  methods: {
    fillCategories() {
      for (var i = 1; i < 15; i++) {
        const item = "Day " + i;
        this.categories.push(item);
      }

      console.log(this.categories);
    },
    fillMembersData(data) {
      let currentAuthor = "";
      let index = -1;

      data.forEach((item) => {
        if (item.author !== currentAuthor) {
          index += 1;
          currentAuthor = item.author;

          this.membersData.push({
            name: currentAuthor,
            series: { name: "worked hours", data: [] },
          });
        }

        this.membersData[index].series.data.push(
          parseFloat(item.time_spent_hours)
        );
      });

      console.log(this.membersData);
    },
    async loadData() {
      const data = await csv_loader("/q302/members_work.csv");
      this.fillMembersData(data);
    },
  },
};
</script>

<style lang="css" scoped></style>
