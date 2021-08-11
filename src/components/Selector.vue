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
export default {
  data() {
    return {
      options: [
        {
          value: "q302",
          label: "Sprint Q302",
        },
        {
          value: "q301",
          label: "Sprint Q301",
        },
        {
          value: "q204",
          label: "Sprint Q204",
        },
        {
          value: "q203",
          label: "Sprint Q203",
        },
      ],
      value: "",
    };
  },
  mounted() {
    // set defaul value
    this.value = "q302";
    this.emitChange(this.value);
  },
  methods: {
    emitChange(value) {
      this.$emit("select", value);
    },
  },
};
</script>
