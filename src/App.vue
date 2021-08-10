<template>
  <div id="app">
    <el-container>
      <!-- <el-aside width="200px">
        <LoadData />
      </el-aside> -->
      <el-container>
        <el-header>
          <Selector @select="setCurrentSprint" />
        </el-header>
        <el-main>
          <TeamCharts :sprintCode="currentSprint" />
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
    };
  },
  methods: {
    setCurrentSprint(value) {
      this.currentSprint = value;
      console.log("set current sprint", value);
    },
  },
};
</script>

<style lang="scss"></style>
