export default {
  name: 'SelectColumns',
  props: {
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectedColumn: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      selectedColumnLocal: ''
    }
  },
  watch: {
    selectedColumnLocal (columns) {
      console.log('column ->', columns)
      this.$emit('update-columns', columns)
    }
  }
}
