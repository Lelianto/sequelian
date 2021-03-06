<template>
  <div class="pt-3">
    <div class="w-full lg:flex gap-4">
      <div class="w-full lg:w-3/4">
        <div class="lg:container border rounded p-3 lg:py-4 lg:flex lg:gap-4">
          <div class="w-full lg:w-1/2">
            <div class="w-full">
              <div class="mb-2 text-sm lg:text-base">
                Select From Table
              </div>
              <select-table
                :tables="csvTables"
                :selected-table="selectedTable"
                @select="setTable"
              />
            </div>
            <hr class="my-5">
            <div class="w-full">
              <div class="mb-2 flex justify-between">
                <div class="relative my-auto text-sm lg:text-base">
                  <label id="column-title" for="select-column">
                    Total Columns ({{ tableColumns.length }})
                  </label>
                </div>
                <el-button class="custom-button" @click="selectAllColumns">
                  Select All Columns
                </el-button>
              </div>
              <select-column
                :columns="tableColumns"
                :selected-columns="selectedColumns"
                @update-columns="setColumns"
              />
            </div>
          </div>
          <div class="w-full relative lg:w-1/2">
            <div class="w-full">
              <div class="mb-2 mt-3 lg:mt-0 flex justify-between">
                <div class="relative my-auto text-sm lg:text-base">
                  Filter
                </div>
                <el-button
                  class="custom-button"
                  icon="el-icon-circle-plus"
                  @click="setFilter"
                >
                  Add Filter
                </el-button>
              </div>
              <div v-if="selectedFilters.length !== 0">
                <div v-for="(item, index) in selectedFilters" :key="'filter-'+index" class="w-full">
                  <filter-item
                    :selected-filter="item"
                    :index="index"
                    :columns="tableColumns"
                    :selected-columns="selectedColumns"
                    @input="setField"
                    @clearFilter="clearFilter"
                    @removeFilter="removeFilter"
                  />
                </div>
              </div>
              <div class="mt-3" :class="{'lg:absolute bottom-0 w-full' : !selectedFilters.length }">
                <div class="text-sm lg:text-base">
                  Limit
                </div>
                <el-input v-model="queryLimit" class="w-full mt-2" placeholder="Input your query limit" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-1/4 mt-3 lg:mt-0">
        <right-card
          :columns="tableColumns"
          :selected-columns="selectedColumns"
          :selected-table="selectedTable"
          :selected-filters="selectedFilters"
          :query-limit="queryLimit*1"
          :queries="queries"
          :env="env"
          @setQuery="setQuery"
        />
      </div>
    </div>
    <div class="w-full mt-5 max-w-full scroll-item">
      <el-table
        :data="pagedTableData"
        border
        class="w-full"
      >
        <el-table-column
          v-for="(head, index) in tableHeaders"
          :key="'header-'+index"
          :prop="head.value"
          :label="head.text"
        />
      </el-table>
      <div v-if="tableItems.length" class="w-full flex justify-center my-3">
        <el-pagination
          layout="prev, pager, next"
          class="custom-pagination"
          :total="tableItems.length"
          @current-change="setPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  components: {
    SelectTable: () => import(/* webpackPrefetch: true */ '@/components/Card/SelectTable/SelectTable.vue'),
    SelectColumn: () => import(/* webpackPrefetch: true */ '@/components/Card/SelectColumn/SelectColumn.vue'),
    FilterItem: () => import(/* webpackPrefetch: true */ '@/components/Card/Filter/FilterItem.vue'),
    RightCard: () => import(/* webpackPrefetch: true */ '@/components/Card/RightCard/RightCard.vue')
  },
  async asyncData ({ $content }) {
    const csvTables = await $content('csv').only(['slug']).fetch()
    return { csvTables }
  },
  data: () => {
    return {
      selectedTable: null,
      columnsData: [],
      selectedColumns: [],
      selectedFilters: [],
      tableColumns: [],
      filterIndex: 0,
      queryLimit: 10,
      page: 1,
      pageSize: 10,
      env: 'prod',
      queries: [
        {
          id: 1,
          text: 'SELECT * FROM products'
        },
        {
          id: 2,
          text: 'SELECT * FROM customers'
        }
      ]
    }
  },
  computed: {
    tableItems () {
      return this.columnsData.body && this.columnsData.body.length
        ? this.columnsData.body
        : []
    },
    tableHeaders () {
      const columns = this.selectedColumns.length
        ? this.selectedColumns
        : this.tableColumns
      return columns.map((item) => {
        return {
          text: item.toUpperCase(),
          value: item
        }
      })
    },
    pagedTableData () {
      return this.tableItems.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    }
  },
  watch: {
    selectedTable () {
      this.columnsData = []
      this.selectedColumns = []
      this.selectedFilters = []
      this.tableColumns = []
      this.filterIndex = 0
      this.queryLimit = 10
      this.page = 1
      this.pageSize = 10
    },
    columnsData (newTable, oldTable) {
      this.tableColumns =
        this.columnsData.body && this.columnsData.body.length
          ? Object.keys(this.columnsData.body[0])
          : []
    },
    selectedColumns (next, prev) {
      if (prev.length > next.length) {
        const difference = prev.filter(x => !next.includes(x))
        this.selectedFilters = this.selectedFilters.filter(
          filter => filter.column !== difference[0]
        )
      }
    }
  },
  methods: {
    async setTable (table) {
      this.selectedTable = table
      this.columnsData = await this.$content('csv', this.selectedTable)
        .only(['body'])
        .fetch()
    },
    setPage (val) {
      this.page = val
    },
    setColumns (columns) {
      this.selectedColumns = [...columns]
    },
    selectAllColumns () {
      this.selectedColumns = [...this.tableColumns]
    },
    setFilter () {
      const id = this.filterIndex
      const filterData = {
        index: id,
        column: null,
        andOrOr: 'and',
        filter: null,
        input1: null,
        input2: null
      }
      this.selectedFilters = [...this.selectedFilters, filterData]
      this.filterIndex += 1
    },
    removeFilter (index) {
      this.selectedFilters = this.selectedFilters.filter(
        filter => filter.index !== index
      )
    },
    clearFilter (index) {
      const newValue = this.selectedFilters.find(item => item.index === index)
      newValue.filter = null
      newValue.input1 = null
      newValue.input2 = null

      this.$set(this.selectedFilters, index, newValue)
    },
    setField (index, key, value) {
      const newValue = this.selectedFilters.find(item => item.index === index)
      newValue[key] = value
      this.$set(this.selectedFilters, index, newValue)
    },
    setQuery (query) {
      if (query === 0) {
        this.setTable('products')
        this.$nextTick(() => {
          this.$nuxt.$loading.start()

          setTimeout(() => {
            this.selectAllColumns()
            this.$nuxt.$loading.finish()
          }, 500)
        })
      } else {
        this.setTable('customers')
        this.$nextTick(() => {
          this.$nuxt.$loading.start()

          setTimeout(() => {
            this.selectAllColumns()
            this.$nuxt.$loading.finish()
          }, 500)
        })
      }
    }
  }
}
</script>
