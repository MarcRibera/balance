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
const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const YEARS = [2021, 2022]

export default {
  props: {
    type: { type: String, default: 'month' },
  },
  data() {
    return {
      options: [],
      value: '',
      elements: [],
    }
  },
  computed: {
    isMonthView() {
      return this.type === 'month'
    },
  },
  mounted() {
    this.elements = this.isMonthView ? MONTHS : YEARS
    this.createSelectorOptions()
    this.setInitialDate()
    console.log('this.elements', this.elements)
  },
  methods: {
    emitChange(value) {
      this.$emit('select', value)
    },
    createSelectorOptions() {
      this.elements.sort((a, b) => (a < b ? 1 : -1))

      this.options = this.elements.map((item) => {
        return {
          value: item,
          label: this.isMonthView ? `Month ${item + 1}` : `Year ${item}`,
        }
      })
    },
    setInitialDate() {
      const currentDate = new Date()

      this.value = this.isMonthView
        ? currentDate.getMonth()
        : currentDate.getFullYear()

      this.emitChange(this.value)
    },
  },
}
</script>
