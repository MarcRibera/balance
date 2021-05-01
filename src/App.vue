<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>
          <DateRangePicker v-on:getCurrentDates="manageReceivedDates" />
        </el-header>
        <el-main>
          <MembersBarchart :data="membersData" />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import DateRangePicker from "./components/DateRangePicker.vue";
import MembersBarchart from "./components/MembersBarchart.vue";

export default {
  name: "App",
  components: { DateRangePicker, MembersBarchart },
  data() {
    return {
      dates: [],
      membersData: [
        {
          name: "Meriadock",
          dates: [
            "2021-03-1",
            "2021-03-2",
            "2021-03-3",
            "2021-03-4",
            "2021-03-5",
          ],
          values: [5, 6, 2, 3, 5.5],
        },
        {
          name: "Pippin",
          dates: [
            "2021-03-1",
            "2021-03-2",
            "2021-03-3",
            "2021-03-4",
            "2021-03-5",
          ],
          values: [3, 5, 8, 1, 3.5],
        },
      ],
    };
  },
  methods: {
    manageReceivedDates(dates) {
      this.dates = dates;
      console.log(dates);
    },
  },
};
</script>

<style lang="scss"></style>
