<template>
  <div id="app">
    <el-container>
      <!-- <el-aside width="200px">
        <LoadData />
      </el-aside> -->
      <el-container>
        <el-header class="app-header">
          <Selector @select="setCurrentSprint" />
          <p>
            From <b>{{ since }}</b> to <b>{{ until }}</b>
          </p>
        </el-header>
        <el-main>
          <TeamCharts
            :sprintCode="currentSprint"
            @sprint-dates-calculated="getSprintDates"
          />
          <MembersBarchart :sprintCode="currentSprint" />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MembersBarchart from "./components/MembersBarchart.vue";
import TeamCharts from "./components/TeamCharts.vue";
import Selector from "./components/Selector.vue";
import { sprintDateFormatter } from "./utils/utils.js";

export default {
  name: "App",
  components: {
    MembersBarchart,
    TeamCharts,
    Selector,
  },
  data() {
    return {
      dates: [],
      currentSprint: "",
      since: null,
      until: null,
    };
  },
  methods: {
    setCurrentSprint(value) {
      this.currentSprint = value;
      console.log("set current sprint", value);
    },
    getSprintDates(dates) {
      console.log("sprint dates", dates);

      this.since = sprintDateFormatter(dates[0]);
      this.until = sprintDateFormatter(dates[dates.length - 1]);
    },
  },
};
</script>

<style lang="scss">
.app-header {
  display: flex;
  p {
    margin-left: 16px;
  }
}
</style>
