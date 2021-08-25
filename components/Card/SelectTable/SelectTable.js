export default {
  name: 'SelectTable',
  props: {
    tables: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectedTable: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      selectedTableLocal: ''
    }
  },
  watch: {
    selectedTableLocal (table) {
      this.$emit('select', table)
    }
  }
}
