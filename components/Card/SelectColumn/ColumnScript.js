export default {
  name: 'SelectColumn',
  props: {
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectedColumns: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    selectedColumnLocal: {
      get () {
        return this.selectedColumns
      },
      set (columns) {
        this.$emit('update-columns', columns)
      }
    }
  }
}
