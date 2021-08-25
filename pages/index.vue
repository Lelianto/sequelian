<template>
  <div class="md:container mx-4 pt-3">
    <div class="w-full md:flex gap-4">
      <div class="w-full md:w-3/4">
        <!-- <left-card
          :tables="csvTables"
          :selected-table="selectedTable"
          @select="setTable"
        /> -->
        <div class="md:container mx-4 border rounded py-4 flex gap-4">
          <div class="w-full lg:w-1/2">
            <div class="w-full">
              <div class="mb-2">
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
                <div class="relative my-auto">
                  Total Columns (0)
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
          <div class="w-full lg:w-1/2">
            <div class="w-full">
              <div class="mb-2 flex justify-between">
                <div class="relative my-auto">
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
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/4 mt-3 md:mt-0">
        <right-card card="right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  components: {
    SelectTable: () => import('@/components/Card/SelectTable/SelectTable.vue'),
    SelectColumn: () => import('@/components/Card/SelectColumn/SelectColumn.vue'),
    FilterItem: () => import('@/components/Card/Filter/FilterItem.vue'),
    RightCard: () => import('@/components/Card/RightCard.vue')
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
      filterIndex: 0
    }
  },
  watch: {
    columnsData (newTable, oldTable) {
      this.tableColumns =
        this.columnsData.body && this.columnsData.body.length
          ? Object.keys(this.columnsData.body[0])
          : []
    }
  },
  methods: {
    async setTable (table) {
      this.selectedTable = table
      this.columnsData = await this.$content('csv', this.selectedTable)
        .only(['body'])
        .fetch()
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
    }
  }
}
</script>
