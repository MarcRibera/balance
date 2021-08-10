<template>
  <el-row class="members-row">
    <el-col :span="8" v-for="(member, index) in membersData" :key="index">
      <BarChart
        :series="member.series"
        :title="getMemberTitle(member.name, member.totalHours)"
      />
    </el-col>
  </el-row>
</template>

<script>
import BarChart from "./BarChart.vue";
import { csv as csv_loader } from "d3";

export default {
  components: { BarChart },
  props: ["sprintCode"],
  data() {
    return {
      membersData: [],
      categories: [],
    };
  },
  mounted() {},
  watch: {
    sprintCode() {
      this.loadData();
    },
  },
  methods: {
    fillMembersData(data) {
      this.membersData = [];
      let currentAuthor = "";
      let index = -1;

      data.forEach((item) => {
        if (item.author !== currentAuthor) {
          currentAuthor = item.author;
          index += 1;

          const memberDataEmpty = {
            name: currentAuthor,
            totalHours: 0,
            series: [
              { name: "worked hours", data: [] },
              {
                name: "reference",
                data: this.getWorkReference(currentAuthor),
                opacity: 0.6,
              },
            ],
          };

          this.membersData.push(memberDataEmpty);
        }

        const hours = parseFloat(item.time_spent_hours);
        this.membersData[index].series[0].data.push(hours);
        this.membersData[index].totalHours += hours;
      });

      console.log(this.membersData);
    },
    async loadData() {
      const data = await csv_loader(this.sprintCode + "/members_work.csv");
      this.fillMembersData(data);
    },
    getMemberTitle(name, hours) {
      return `${name} - ${hours}h`;
    },
    getWorkReference(author) {
      if (author === "Marc R") {
        return [3, 5, 4, 0, 0, 5, 5, 3, 5, 4, 0, 0, 4, 2];
      }
      return [4, 6, 5, 0, 0, 6, 6, 4, 6, 5, 0, 0, 5, 3];
    },
  },
};
</script>

<style lang="css" scoped>
.members-row {
  margin-top: 50px;
}
</style>
