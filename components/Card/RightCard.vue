<template>
  <div class="lg:container mx-4 border rounded">
    <div class="subtitle-1 my-5 text-uppercase text-lg font-bold">
      SQL Statement
    </div>
    <hr v-if="selectedTable" class="w-full my-5">
    <pre v-if="selectedTable"><code ref="codeInput" v-highlight class="sql break-space" />{{ contentText() }}</pre>
  </div>
</template>

<script>
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
</script>
