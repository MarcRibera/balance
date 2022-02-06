<template>
  <el-select v-model="value" placeholder="Select" @change="emitChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
import { getSprintsCodes } from "../../public/sprintCodes.js";

export default {
  data() {
    return {
      options: [],
      value: "",
      sprintCodes: [],
    };
  },
  mounted() {
    this.sprintCodes = getSprintsCodes();
    this.createSelectorOptions();
    console.log("this.sprintCodes", this.sprintCodes);
  },
  methods: {
    emitChange(value) {
      this.$emit("select", value);
    },
    createSelectorOptions() {
      this.sprintCodes.sort((a, b) => (a < b ? 1 : -1));

      this.sprintCodes.forEach((item) => {
        const newItem = {
          value: item,
          label: `Sprint ${item.toUpperCase()}`,
        };
        this.options.push(newItem);
      });

      // set inital value
      this.value = this.sprintCodes[0];
      this.emitChange(this.value);
      console.log("emit crurrent sprint", this.value);
    },
  },
};
</script>
