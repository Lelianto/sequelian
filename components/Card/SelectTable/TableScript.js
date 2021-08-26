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
  computed: {
    selectedTableLocal: {
      get () {
        return this.selectedTable
      },
      set (table) {
        this.$emit('select', table)
      }
    }
  }
}
