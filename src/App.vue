<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>
          <DateRangePicker v-on:getCurrentDates="manageReceivedDates" />
        </el-header>
        <el-main>
          <p>Current dates received {{ dates }}</p>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import DateRangePicker from "./components/DateRangePicker.vue";

export default {
  name: "App",
  components: { DateRangePicker },
  data() {
    return {
      dates: [],
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
