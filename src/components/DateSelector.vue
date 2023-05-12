<template>
  <el-select v-model="value" placeholder="Select" @change="emitNewValue">
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
import { getMonthNames } from '@/utils/utils'
import { getYears } from '@/utils/utils'
// TODO this component should be agnostic, so  this const
// should be removed, and get this data as a prop
const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const YEARS = getYears()

export default {
  props: {
    type: { type: String, default: 'month' },
  },
  data() {
    return {
      options: [],
      value: '',
      elements: [],
      monthNames: getMonthNames(),
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
  },
  methods: {
    emitNewValue(value) {
      this.$emit('select', value)
    },
    createSelectorOptions() {
      this.options = this.elements.map((item) => {
        return {
          value: item,
          label: this.isMonthView ? `${this.monthNames[item]}` : `${item}`,
        }
      })
    },
    setInitialDate() {
      const currentDate = new Date()

      this.value = this.isMonthView
        ? currentDate.getMonth()
        : currentDate.getFullYear()

      this.emitNewValue(this.value)
    },
  },
}
</script>
