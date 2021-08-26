export default {
  name: 'RightCard',
  props: {
    selectedTable: {
      type: String,
      default: ''
    },
    selectedColumns: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    selectedFilters: {
      type: Array,
      default () {
        return []
      }
    },
    queryLimit: {
      type: Number,
      default: 1
    },
    queries: {
      type: Array,
      default () {
        return []
      }
    },
    env: {
      type: String,
      default: 'prod'
    }
  },
  data () {
    return {
      operators: {
        'greater than': '>',
        'less than': '<',
        equal: '==',
        'not equal': '!==',
        in: 'in',
        between: 'between'
      }
    }
  },
  computed: {
    query: {
      get () {
        return this.contentText()
      },
      set () {}
    }
  },
  methods: {
    setQuery (index) {
      this.$emit('setQuery', index)
    },
    contentText () {
      const selectStatement =
          (this.selectedColumns.length === this.columns.length
            ? 'SELECT *'
            : `SELECT ${this.selectedColumns.length ? this.selectedColumns.map(col => `"${col}"`).join(', ') : '*'}`) + `\nFROM ${this.selectedTable}`
      if (this.selectedFilters.length > 0) {
        const conditionsStatement = this.selectedFilters.map(
          (filter, index) => {
            let statement =
                index > 0
                  ? `${filter.andOrOr} "${filter.column}"`
                  : `"${filter.column}"`
            if (
              [
                'equal',
                'not equal',
                'greater than',
                'less than',
                'in'
              ].includes(filter.filter)
            ) {
              statement = `${statement} ${this.operators[filter.filter]} ${
                  filter.input1
                }`
              return statement
            } else if (filter.filter === 'between') {
              statement = `${statement} ${this.operators[filter.filter]} '${
                  filter.input1
                }' and '${filter.input2}'`
              return statement
            }
            return statement
          }
        )
        this.$refs.codeInput.innerHTML = `${selectStatement + '\nWHERE ' + conditionsStatement.join('\n') + `\nlimit ${this.queryLimit}`}`
        return ''
      } else {
        if (this.$refs.codeInput) {
          this.$refs.codeInput.innerHTML = `${selectStatement + `\nlimit ${this.queryLimit}`}`
        }
        return ''
      }
    }
  }
}
