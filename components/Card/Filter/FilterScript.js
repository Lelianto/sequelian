export default {
  name: 'FilterItem',
  props: {
    selectedFilter: {
      type: Object,
      default () {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    },
    selectedColumns: {
      type: Array,
      default () {
        return [
          {
            index: 0,
            column: null,
            andOrOr: 'and',
            filter: null,
            input1: null,
            input2: null
          }
        ]
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data: () => {
    return {
      filters: [
        'equal',
        'not equal',
        'greater than',
        'less than',
        'between',
        'in'
      ]
    }
  },
  computed: {
    localFilter () {
      return this.selectedFilter
    }
  },
  methods: {
    queryLogic (logic) {
      this.$emit('input', this.index, 'andOrOr', logic)
    },
    clearFilter (index) {
      this.$emit('clearFilter', index)
    },
    removeFilter (index) {
      this.$emit('removeFilter', index)
    },
    columnFilters (col) {
      if (col !== null && col !== undefined) {
        return [
          'equal',
          'not equal',
          'greater than',
          'less than',
          'between',
          'in'
        ]
      } else {
        return []
      }
    }
  }
}
