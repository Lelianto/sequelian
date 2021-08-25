<template>
  <div class="lg:container mx-4 border rounded">
    <span class="subtitle-1 my-5 text-uppercase">SQL Statement</span>
    <hr v-if="selectedTable" class="w-full mt-5">
    <pre v-if="selectedTable">
      <code v-highlight class="sql break-space" v-html="contentText()" />
    </pre>
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
        return `<div>${selectStatement + '\nWHERE ' + conditionsStatement.join('\n') + `\nlimit ${this.queryLimit}`}</div>`
      } else {
        return `<div>${selectStatement + `\nlimit ${this.queryLimit}`}</div>`
      }
    }
  }
}
</script>
