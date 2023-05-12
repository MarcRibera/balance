<template>
  <div class="card" :style="cardSyle" v-if="this.category">
    <div class="header">
      <h3>{{ this.categoryData.name }}</h3>
      <h2>
        {{ this.categoryData.totalFormatted }}
      </h2>
    </div>
    <div class="percentages">
      <div class="out">
        <h4>OUT</h4>
        <h4>{{ this.categoryData.percentOnOutput }}%</h4>
      </div>

      <div class="in">
        <h5>IN:</h5>
        <h5>{{ this.categoryData.percentOnInput }}%</h5>
      </div>

      <div class="avg">
        <h4>AVG</h4>
        <h4>{{ this.categoryData.monthAverage }} &euro;</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { getCategoryColor } from '@/utils/utils'

export default {
  name: 'MonthlyCard',
  components: {},
  props: {
    category: {
      type: Object,
      default: () => {},
    },
  },
  watch: {},
  computed: {
    cardSyle() {
      const color = getCategoryColor(this.category.name)
      return `background-color:${color}`
    },
  },
  data() {
    return {
      categoryData: {},
    }
  },
  mounted() {
    this.hydrateCategoryData()
  },
  methods: {
    hydrateCategoryData() {
      this.categoryData = cloneDeep(this.category)
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  padding: 8px 16px;
  margin: 8px;
  box-shadow: 7px 7px 10px gray;
  border-radius: 8px;
  min-width: 160px;
  .header {
    text-align: center;
    margin-bottom: -20px;
  }
  .percentages {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h5 {
      font-size: 12px;
    }
    h4 {
      margin: 4px;
    }
  }
}
</style>
